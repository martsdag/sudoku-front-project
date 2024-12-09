<template>
  <BaseButton @click="onOpen">Open Dialog</BaseButton>
  <BaseDialog title="Текст" ref="baseDialog" @open="onOpen" @close="onClose"></BaseDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton';
import BaseDialog from '@/components/BaseDialog.vue';

const baseDialog = ref<InstanceType<typeof BaseDialog> | null>(null);

const onOpen = () => {
  baseDialog.value?.open();
};

const onClose = () => {
  baseDialog.value?.close();
};
</script>

<style>
.dialog__button-close {
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog__p {
  margin: 15px 0;
  font-size: 1rem;
  line-height: 1.4;
}
</style>
