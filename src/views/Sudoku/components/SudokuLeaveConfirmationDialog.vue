<template>
  <BaseDialog
    class="page-sudoku__dialog-confirmation"
    title="Действительно ли Вы хотите покинуть данную страницу?"
    :buttons="[
      { id: 1, text: 'OK', onClick: onClickOk },
      { id: 2, text: 'Отмена', onClick: onClickCancel },
    ]"
    ref="baseDialog"
  >
    <p class="page-sudoku__dialog-confirmation-description">Прогресс текущей игры будет потерян.</p>
  </BaseDialog>
</template>

<script setup lang="ts">
import BaseDialog from '@/components/BaseDialog/BaseDialog.vue';
import { useConfirmDialog } from '@vueuse/core';
import { useTemplateRef } from 'vue';

const baseDialog = useTemplateRef('baseDialog');

const { reveal: _reveal, confirm, cancel } = useConfirmDialog();

const onClickOk = () => {
  confirm();
  baseDialog.value?.close();
};

const onClickCancel = () => {
  cancel();
  baseDialog.value?.close();
};

const reveal = async () => {
  baseDialog.value?.open();

  const { isCanceled } = await _reveal();

  return !isCanceled;
};

defineExpose({
  reveal,
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
