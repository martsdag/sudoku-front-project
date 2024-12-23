<template>
  <BaseDialog class="dialog-confirmation" :title ref="baseDialog">
    <div class="dialog-confirmation__inner">
      <p class="dialog-confirmation__message">{{ message }}</p>
    </div>
  </BaseDialog>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';

import BaseDialog from '@/components/BaseDialog';

defineProps<{
  title: string;
  message: string;
}>();

const baseDialog = useTemplateRef('baseDialog');

defineExpose({
  open: () => baseDialog.value?.open(),
  close: () => baseDialog.value?.close(),
});
</script>

<style>
.dialog-confirmation {
  .dialog-confirmation__message {
    all: unset;
  }

  .dialog-confirmation__inner {
    display: flex;
    flex-direction: column;
  }
}
</style>
