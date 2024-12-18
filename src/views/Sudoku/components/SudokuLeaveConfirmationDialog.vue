<template>
  <BaseDialog
    class="page-sudoku__dialog-confirmation"
    title="Действительно ли Вы хотите покинуть данную страницу?"
    :buttons="[
      { id: 1, text: 'OK', onClick: confirmDialog },
      { id: 2, text: 'Отмена', onClick: closeDialog },
    ]"
    ref="baseDialog"
  >
    <p class="page-sudoku__dialog-confirmation-description">Прогресс текущей игры будет потерян.</p>
  </BaseDialog>
</template>

<script setup lang="ts">
import BaseDialog from '@/components/BaseDialog/BaseDialog.vue';
import { useTemplateRef } from 'vue';

const baseDialog = useTemplateRef('baseDialog');

let resolveDialog: ((value: boolean) => void) | null = null;

const confirmDialog = () => {
  resolveDialog?.(true);
  closeDialog();
};

const closeDialog = () => {
  resolveDialog?.(false);
  baseDialog.value?.close();
};

const openDialog = () => {
  baseDialog.value?.open();

  return new Promise<boolean>((resolve) => {
    resolveDialog = resolve;
  });
};

defineExpose({
  openDialog,
  closeDialog,
});
</script>

<style>
.page-sudoku__dialog-confirmation {
  max-width: 600px;
  max-height: 300px;
}

.page-sudoku__dialog-confirmation-description {
  all: unset;
  padding-bottom: 10px;
  color: var(--color-zinc-700);
  font-weight: 400;
}
</style>
