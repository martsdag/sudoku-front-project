<template>
  <button
    type="button"
    class="button"
    :class="{ 'button-disabled': isDisabled }"
    :disabled="isDisabled"
    @click="onCLick"
  >
    <div class="button-content">
      <slot />
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<
  Partial<{
    isDisabled: boolean;
  }>
>();

const emit = defineEmits<{
  click: [Event];
}>();

const isDisabled = computed(() => props.isDisabled);

const onCLick = (e: Event) => {
  if (isDisabled.value) {
    return;
  }

  emit('click', e);
};
</script>

<style>
.button {
  all: unset;
  background-color: #6495ed;
  border: 2px solid #2f58a3;
  border-radius: 6px;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
  position: relative;
}

.button:hover {
  background-color: #8fb3f1;
}

.button-disabled {
  pointer-events: none;
  background-color: #1f3a70;
  opacity: 0.25;
  color: #f0f8ff;
  cursor: not-allowed;
}

.button:active {
  color: #f0f8ff;
  border-color: #2f58a3;
}

.button:focus {
  outline: 1px solid #1f3a70;
}

.button-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
</style>
