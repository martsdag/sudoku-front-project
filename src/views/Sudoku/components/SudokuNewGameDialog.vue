<template>
  <BaseDialog
    class="page-sudoku__dialog-new-game"
    title="Начать новую игру"
    :buttons="[
      { id: 1, text: 'OK', onClick: onConfirm },
      { id: 2, text: 'Отмена', onClick: onCancel },
    ]"
    ref="baseDialog"
  >
    <p class="page-sudoku__dialog-new-game-description">Прогресс текущей игры будет потерян.</p>
  </BaseDialog>
</template>

<script setup lang="ts">
import BaseDialog from '@/components/BaseDialog/BaseDialog.vue';
import { useConfirmDialog } from '@vueuse/core';
import { useTemplateRef } from 'vue';

const baseDialog = useTemplateRef('baseDialog');

const { reveal, confirm, cancel } = useConfirmDialog();

const onConfirm = () => {
  confirm();
  baseDialog.value?.close();
};

const onCancel = () => {
  cancel();
  baseDialog.value?.close();
};

const openDialog = async () => {
  baseDialog.value?.open();

  const { isCanceled } = await reveal();

  return !isCanceled;
};

defineExpose({
  openDialog,
});
</script>

<style>
.page-sudoku__dialog-new-game {
  max-width: 400px;
  max-height: 200px;
}

.page-sudoku__dialog-new-game-description {
  all: unset;
  padding-bottom: 10px;
  color: var(--color-zinc-700);
  font-weight: 400;
}
</style>
