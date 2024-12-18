<template>
  <BaseDialog
    class="page-sudoku__dialog-new-game"
    title="Начать новую игру"
    :buttons="[
      { id: 1, text: 'OK', onClick: () => confirm() },
      { id: 2, text: 'Отмена', onClick: () => cancel() },
    ]"
    ref="baseDialog"
  >
    <p class="page-sudoku__dialog-new-game-description">Прогресс текущей игры будет потерян.</p>
  </BaseDialog>
</template>

<script setup lang="ts">
import BaseDialog from '@/components/BaseDialog/BaseDialog.vue';
import { useTemplateRef } from 'vue';

const baseDialog = useTemplateRef('baseDialog');
let resolveDialog: (value: boolean) => void;

const openDialog = () =>
  new Promise<boolean>((resolve) => {
    resolveDialog = resolve;
    baseDialog.value?.open();
  });

const confirm = () => {
  resolveDialog(true);
  baseDialog.value?.close();
};

const cancel = () => {
  resolveDialog(false);
  baseDialog.value?.close();
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
