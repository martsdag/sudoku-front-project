<template>
  <button type="button" :disabled="isDisabled" class="button" @click="onClick">{{ label }}</button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  isDisabled: Boolean,
  isLoading: Boolean,
  label: {
    type: String,
    default: 'Текст кнопки',
  },
});

const emit = defineEmits(['click']);

const isDisabled = computed(() => props.isDisabled || props.isLoading);

const onClick = (e: Event) => {
  if (!isDisabled.value) {
    emit('click', e);
  }
};
</script>

<style>
button {
  all: unset;
  background-color: #6495ed;
  border: 1px solid #4169e1;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
}

button:active {
  background-color: #27408b;
  color: #e0ffff;
  border-color: #1c2d5c;
  box-shadow: none;
  transition:
    background-color 0.1s,
    border-color 0.1s;
}

button:hover {
  background-color: #5a82db;
  color: #ffffff;
  border-color: #4169e1;
  box-shadow: 0 4px 8px rgba(0, 0, 128, 0.15);
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;
}
</style>
