<template>
  <button type="button" class="button" :class="{ 'button:disabled': disabled }" :disabled @click="onClick">
    <div class="button-content">
      <slot />
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  click: [Event];
}>();

const disabled = ref(false);

const onClick = (e: Event) => {
  if (disabled.value) {
    return;
  }

  emit('click', e);
};
</script>
