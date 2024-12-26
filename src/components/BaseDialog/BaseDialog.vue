<template>
  <dialog class="dialog _container" ref="dialog" @close="onClose" @cancel.prevent="onClose">
    <div class="dialog__inner" ref="dialogInner">
      <slot v-if="!isHiddenHeader" name="header" v-bind="{ close }">
        <div class="dialog__header">
          <span v-if="isNotNil(title)" class="dialog__title">{{ title }}</span>
          <LazyBaseButton class="dialog__button-close" @click="onClickCloseIcon">
            <LazyBaseIcon :path="mdiClose" />
          </LazyBaseButton>
        </div>
      </slot>
      <slot v-bind="{ close }" />
      <slot v-if="!isHiddenFooter" name="footer" v-bind="{ close }">
        <div v-if="buttons.length > 0" class="dialog__footer">
          <LazyBaseButton v-for="button in buttons" :key="button.id" @click="button.onClick">
            {{ button.text }}
          </LazyBaseButton>
        </div>
      </slot>
    </div>
  </dialog>
</template>

<i18n lang="json">
{
  "En": {
    "confirm": "Confirm",
    "cancel": "Cancel"
  },
  "Ru": {
    "confirm": "Подтвердить",
    "cancel": "Отмена"
  }
}
</i18n>

<script setup lang="ts">
import { computed, ref, defineAsyncComponent, onBeforeUnmount, useTemplateRef } from 'vue';
import { onClickOutside, useMutationObserver, useScrollLock, useToggle } from '@vueuse/core';
import { mdiClose } from '@mdi/js';
import { isNotNil } from '@/utils/isNotNil';
import type { FunctionCallback } from '@/types';
import { useI18n } from 'vue-i18n';

const LazyBaseButton = defineAsyncComponent(() => import('@/components/BaseButton'));
const LazyBaseIcon = defineAsyncComponent(() => import('@/components/BaseIcon'));

const dialog = useTemplateRef('dialog');
const dialogInner = useTemplateRef('dialogInner');

const isLocked = useScrollLock(document.body);
const toggleIsLocked = useToggle(isLocked);

interface Button {
  id: number | string;
  text: string;
  onClick: FunctionCallback;
}

const props = defineProps<
  Partial<{
    title: string;
    buttons: Array<Button>;
    isHiddenHeader: boolean;
    isHiddenFooter: boolean;
  }>
>();

const emit = defineEmits<{
  open: [];
  close: [];
  confirm: [];
  cancel: [];
}>();

const { t } = useI18n({ useScope: 'local' });

const buttons = computed(
  () =>
    props.buttons ?? [
      {
        id: 0,
        text: t('cancel'),
        onClick: () => {
          emit('cancel');
          close();
        },
      },
      {
        id: 1,
        text: t('confirm'),
        onClick: () => {
          emit('confirm');
          close();
        },
      },
    ],
);

const isOpened = ref(Boolean(dialog.value?.open));

useMutationObserver(
  dialog,
  () => {
    isOpened.value = Boolean(dialog.value?.open);
  },
  {
    attributes: true,
  },
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
  outline: 0.125rem solid transparent;
  outline-offset: 0.125rem;
  border-radius: 0.5rem;
  background-color: var(--color-white);
  margin: auto !important;
  overflow-x: hidden;
  &::backdrop {
    background-color: rgba(0, 0, 0, 0.33);
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

  .dialog__title {
    font-size: 1.125rem;
  }

  .dialog__button-close {
    all: unset;
    cursor: pointer;
    color: var(--color-blue-900);
    width: 1.5rem;
    height: 1.5rem;
    margin-inline-start: auto;

    &:hover {
      color: var(--color-blue-950);
      background-color: var(--color-zinc-200);
      border-radius: 1.5rem;
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
    margin-top: 0.625rem;
  }
}
</style>
