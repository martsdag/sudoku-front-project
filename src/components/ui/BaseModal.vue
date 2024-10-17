<template>
  <dialog ref="refDialog" class="simple-modal" @close="onClose">
    <div class="simple-modal-content">
      <slot name="header" />
      <slot />
      <div class="simple-modal-footer">
        <button @click="onClose">Close</button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue';

const refDialog = ref<HTMLDialogElement>();

const open = () => {
  refDialog.value?.showModal();
};

const close = () => {
  refDialog.value?.close();
};

const onClose = () => {
  close();
};

defineExpose({
  open,
  close,
});
</script>

<style>
.simple-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  background: rgba(0, 0, 0, 0.5);
}

.simple-modal-content {
  padding: 16px;
  background: white;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.simple-modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
