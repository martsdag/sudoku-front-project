<template>
  <div class="timer-container">
    <div v-if="isTimerVisible" class="timer">{{ formattedTime }}</div>
    <BaseIcon
      :path="mdiTimerOutline"
      class="icon"
      :class="[{ active: isTimerRunning }, ICON.default]"
      @click="toggleTimer"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { mdiTimerOutline } from '@mdi/js';
import BaseIcon from './BaseIcon/BaseIcon.vue';
import { useNow } from '@vueuse/core';
import { format } from 'date-fns';
import { ICON } from '@/helpers/ui';

const isTimerRunning = ref(false);
const isTimerVisible = ref(false);

const startTime = ref<number | null>(null);
const now = useNow({ interval: 1000 });

const formattedTime = computed(() => {
  if (!isTimerRunning.value || startTime.value === null) {
    return '00:00';
  }

  const timeElapsed = now.value.getTime() - startTime.value;

  return format(new Date(timeElapsed), 'mm:ss');
});

const startTimer = () => {
  if (!isTimerRunning.value) {
    isTimerVisible.value = true;
    startTime.value = now.value.getTime();
    isTimerRunning.value = true;
  }
};

const stopTimer = () => {
  if (isTimerRunning.value) {
    isTimerRunning.value = false;
    startTime.value = null;
  }
};

const resetTimer = () => {
  isTimerRunning.value = false;
  startTime.value = null;
  isTimerVisible.value = false;
};

const toggleTimer = () => {
  if (isTimerRunning.value) {
    stopTimer();
  } else {
    startTimer();
  }
};

defineExpose({ resetTimer, startTimer });
</script>

<style>
.timer-container {
  display: flex;
  gap: 0.3rem;
  align-items: center;
  flex-direction: row-reverse;
}

.timer {
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
}

.icon {
  cursor: pointer;
  color: var(--color-blue-950);
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-blue-300);
  }
}

.icon.active {
  color: var(--color-blue-500);
}
</style>
