<template>
  <BaseDialog :buttons="[{ id: 0, text: 'OK', onClick: () => closeDialog() }]" ref="baseDialog">
    <img src="/src/assets/images/victory.jpg" alt="Victory image" />
  </BaseDialog>
</template>

<script setup lang="ts">
import BaseDialog from '@/components/BaseDialog/BaseDialog.vue';
import { useTemplateRef } from 'vue';

const baseDialog = useTemplateRef('baseDialog');

const openDialog = () => baseDialog.value?.open();
const closeDialog = () => baseDialog.value?.close();

defineExpose({
  openDialog,
  closeDialog,
});
</script>
