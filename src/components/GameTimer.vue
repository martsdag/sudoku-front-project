<template>
  <div class="game-timer">
    <div class="game-timer__time">{{ formattedTime }}</div>
    <BaseIcon
      :path="mdiTimerOutline"
      class="game-timer__icon"
      :class="{ 'game-timer__icon--active': isTimerRunning }"
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

const isTimerRunning = ref(false);
const startTime = ref<number | null>(null);

const now = useNow({ interval: 500 });

const formattedTime = computed(() => {
  if (!isTimerRunning.value || startTime.value === null) {
    return '00:00';
  }

  const timeElapsed = now.value.getTime() - startTime.value;

  return format(new Date(timeElapsed), 'mm:ss');
});

const startTimer = () => {
  if (!isTimerRunning.value) {
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
.game-timer {
  display: flex;
  flex-direction: row-reverse;
}

.game-timer__time {
  font-size: 1.125rem;
  font-weight: bold;
  padding: 0.25rem;
  color: var(--color-zinc-800);
}

.game-timer__icon {
  cursor: pointer;
  color: var(--color-blue-950);
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-blue-300);
  }

  &.game-timer__icon--active {
    color: var(--color-blue-500);
  }
}
</style>
