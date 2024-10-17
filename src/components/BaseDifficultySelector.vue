<template>
  <div>
    <slot name="header">
      <p>Choose the difficulty level: {{ selectedDifficulty }}</p>
    </slot>
    <div>
      <label>
        <input v-model="selectedDifficulty" type="radio" name="difficulty" value="Easy" />
        Easy
      </label>
      <label>
        <input v-model="selectedDifficulty" type="radio" name="difficulty" value="Medium" />
        Medium
      </label>
      <label>
        <input v-model="selectedDifficulty" type="radio" name="difficulty" value="Hard" />
        Hard
      </label>
      <label>
        <input v-model="selectedDifficulty" type="radio" name="difficulty" value="Expert" />
        Expert
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'DifficultySelector',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selectedDifficulty = ref(props.modelValue);

    watch(selectedDifficulty, (newVal) => {
      emit('update:modelValue', newVal);
    });

    return { selectedDifficulty };
  },
});
</script>
