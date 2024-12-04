import { ref, computed } from 'vue';
import { useNow } from '@vueuse/core';

export const useTimePassed = () => {
  const isActive = ref(false);
  const startTime = ref<number | null>(null);
  const now = useNow({ interval: 500 });

  const timePassed = computed(() => {
    if (!isActive.value || startTime.value === null) {
      return null;
    }

    return now.value.getTime() - startTime.value;
  });

  const start = () => {
    if (!isActive.value) {
      startTime.value = now.value.getTime();
      isActive.value = true;
    }
  };

  const stop = () => {
    if (isActive.value) {
      isActive.value = false;
    }
  };

  const reset = () => {
    isActive.value = false;
    startTime.value = null;
  };

  return {
    timePassed,
    start,
    stop,
    reset,
    isActive,
  };
};
