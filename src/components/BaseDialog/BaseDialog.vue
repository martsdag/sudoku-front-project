<template>
  <dialog class="_container dialog" ref="dialog" @close="onClose" @cancel.prevent="onClose">
    <div class="dialog__inner" ref="dialogInner">
      <slot v-if="!isHiddenHeader" name="header" v-bind="{ close }">
        <div class="dialog__header">
          <span v-if="title" class="dialog__header-title">{{ title }}</span>
          <BaseButton class="dialog__close-button" @click="onClickCloseIcon">
            <BaseIcon :path="mdiClose" ICON.SIZE.LG />
          </BaseButton>
        </div>
      </slot>

      <slot v-bind="{ close }" />

      <slot v-if="!isHiddenFooter" name="footer" v-bind="{ close }">
        <div v-if="buttons.length" class="dialog__footer">
          <BaseButton v-for="(button, index) in buttons" :key="index" @click="button.onClick">
            {{ button.text }}
          </BaseButton>
        </div>
      </slot>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, useTemplateRef, type PropType } from 'vue';
import { onClickOutside, useMutationObserver, useScrollLock, useToggle } from '@vueuse/core';
import { mdiClose } from '@mdi/js';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';

const dialog = useTemplateRef('dialog');
const dialogInner = useTemplateRef('dialogInner');

const isLocked = useScrollLock(document.getElementById('main'));
const toggleIsLocked = useToggle(isLocked);

interface Button {
  text: string;
  onClick: () => void;
}

const props = defineProps({
  title: String,
  buttons: {
    type: Array as PropType<Button[]>,
    default: () => [],
  },
  isHiddenHeader: Boolean,
  isHiddenFooter: Boolean,
});

const emit = defineEmits(['open', 'close', 'confirm', 'cancel']);

const buttons = computed(() =>
  props.buttons.length
    ? props.buttons
    : [
        {
          text: 'Cancel',
          onClick: () => {
            emit('cancel');
            close();
          },
        },
        {
          text: 'Confirm',
          onClick: () => {
            emit('confirm');
            close();
          },
        },
      ],
);

const isOpened = ref(false);

useMutationObserver(
  dialog,
  () => {
    isOpened.value = Boolean(dialog.value?.open);
  },
  { attributes: true },
);

const open = () => {
  if (isOpened.value) {
    return;
  }

  dialog.value?.showModal();
  toggleIsLocked(true);
  emit('open');
};

const close = () => {
  if (!isOpened.value) {
    return;
  }

  dialog.value?.close();
  toggleIsLocked(false);
  emit('close');
};

const onClose = close;
const onClickCloseIcon = close;

onClickOutside(dialogInner, close);

onBeforeUnmount(() => toggleIsLocked(false));

defineExpose({
  open,
  close,
  isOpened,
});
</script>

<style>
.dialog {
  border-width: 1px;
  border-color: var(--color-blue-500);
  outline: 2px solid transparent;
  outline-offset: 2px;
  border-radius: 0.5rem;
  background-color: var(--color-white);
  margin: auto !important;
  overflow-x: hidden;
  &::backdrop {
    background-color: rgba(0, 0, 0, 0.33);
  }
}

.dialog__inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  scrollbar-gutter: stable both-edges;
}

.dialog__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.dialog__header-title {
  font-size: 18px;
}

.dialog__close-button {
  all: unset;
  cursor: pointer;
  color: var(--color-blue-900);
  width: 25px;
  height: 25px;
  margin-inline-start: auto;

  &:hover {
    color: var(--color-blue-950);
    background-color: var(--color-zinc-200);
    border-radius: 20px;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
}

.dialog__footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 10px;
}
</style>
