<template>
  <BaseButton @click="onOpen">Open Dialog</BaseButton>
  <BaseDialog ref="baseDialog" @open="onOpen" @close="onClose">
    <img src="https://avatars.mds.yandex.net/i?id=9413f4a95071e05daff4a079eb7986a5_l-5348026-images-thumbs&n=13"
  /></BaseDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseDialog from '@/components/BaseDialog/BaseDialog.vue';

const baseDialog = ref<InstanceType<typeof BaseDialog> | null>(null);

const onOpen = () => {
  baseDialog.value?.open();
};

const onClose = () => {
  baseDialog.value?.close();
};
</script>

<style>
.dialog__h3 {
  margin: 15px 0;
  font-size: 1rem;
  line-height: 1.4;
}
</style>
