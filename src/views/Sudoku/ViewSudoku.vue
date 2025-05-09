<template>
  <div class="page-sudoku _container _page">
    <div class="page-sudoku__sudoku-timer">
      <BaseButton
        class="page-sudoku__sudoku-timer-button"
        :class="isActive && 'page-sudoku__sudoku-timer-button--active'"
        @click="onClickTimerIcon"
      >
        <BaseIcon :path="mdiTimerOutline" />
      </BaseButton>
      <div class="page-sudoku__sudoku-timer-time">{{ formattedTime }}</div>
    </div>
    <table class="page-sudoku__sudoku-grid">
      <tbody>
        <tr v-for="(row, rowIndex) in model" :key="rowIndex">
          <td
            v-for="(col, colIndex) in row"
            class="page-sudoku__sudoku-cell"
            :class="{
              'page-sudoku__sudoku-cell_bold-border-right': (colIndex + 1) % 3 === 0 && colIndex !== 8,
              'page-sudoku__sudoku-cell_bold-border-bottom': (rowIndex + 1) % 3 === 0 && rowIndex !== 8,
              'page-sudoku__sudoku-cell_error': sudokuStore.validationResult.errors[rowIndex]?.[colIndex] === '+',
            }"
            :key="colIndex"
          >
            <input
              type="text"
              inputmode="numeric"
              maxlength="1"
              :value="col === '-' ? '' : col"
              class="page-sudoku__cell-input"
              :readonly="/\d/.test(String(sudokuStore.sudoku.puzzle?.[rowIndex]?.[colIndex]))"
              @input="(event) => onInput(event, [rowIndex, colIndex])"
              @focus="onFocus"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="page-sudoku__buttons">
      <RouterLink
        v-for="difficulty in Object.values(Difficulty)"
        :to="{ name: RouteName.Sudoku, query: { difficulty } }"
        :class="[BUTTON.default, difficulty === route.query.difficulty && BUTTON.ACTIVE]"
        :key="difficulty"
      >
        {{ t(`difficulty.${difficulty}`) }}
      </RouterLink>
    </div>
    <DialogIsWin ref="dialogIsWin " />
    <DialogConfirmation
      :title="t('gameReset')"
      :message="t('gameResetDescription')"
      ref="dialogConfirmation"
      @confirm="confirm"
      @cancel="cancel"
      @close="cancel"
    />
  </div>
</template>

<i18n lang="json">
{
  "En": {
    "gameReset": "Your progress will be lost",
    "gameResetDescription": "If you leave the page or change the difficulty, the current game will be reset. Confirm the action.",
    "difficulty": {
      "easy": "Easy",
      "medium": "Medium",
      "hard": "Hard",
      "expert": "Expert"
    }
  },
  "Ru": {
    "gameReset": "Ваш прогресс будет утерян",
    "gameResetDescription": "Если вы покинете страницу или смените сложность, текущая игра будет сброшена. Подтвердите действие.",
    "difficulty": {
      "easy": "Легкий",
      "medium": "Средний",
      "hard": "Сложный",
      "expert": "Эксперт"
    }
  }
}
</i18n>

<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router';

import { Difficulty, type Sudoku } from '@/api/sudoku';
import { useSudokuStore } from '@/stores/sudoku';
import { isDifficulty } from '@/helpers/isDifficulty';
import { BUTTON } from '@/helpers/ui';
import { goToPage404 } from '@/composables/goToPage404';
import { useTimePassed } from '@/composables/useTimePassed';
import { RouteName } from '@/router';
import { isNil } from '@/utils/isNil';
import { format } from 'date-fns';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import DialogConfirmation from '@/components/DialogConfirmation.vue';
import { mdiTimerOutline } from '@mdi/js';
import { useConfirmDialog, useEventListener, useToggle } from '@vueuse/core';
import DialogIsWin from '@/components/DialogIsWin.vue';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const sudokuStore = useSudokuStore();
const model = ref<Sudoku['puzzle']>([]);
const dialogConfirmation = useTemplateRef('dialogConfirmation');
const dialogIsWin = useTemplateRef('dialogIsWin ');

const { t } = useI18n({ useScope: 'local' });

const { reveal, confirm, cancel } = useConfirmDialog();

const { timePassed, start, reset, stop, isActive } = useTimePassed();

const formattedTime = computed(() => format(new Date(timePassed.value ?? 0), 'mm:ss'));

const onFocus = (event: FocusEvent) => {
  const input = event.target as HTMLInputElement;

  if (input.readOnly) {
    return;
  }

  start();

  input.setSelectionRange(input.value.length, input.value.length);
};

const onClickTimerIcon = () => (isActive.value ? stop() : start());

const onInput = (event: Event, [rowIndex, colIndex]: [number, number]) => {
  const sanitizedValue = (event.target as HTMLInputElement).value.replace(/[^1-9]/g, '');

  const row = model.value[rowIndex];

  if (isNil(row)) {
    return;
  }

  row[colIndex] = sanitizedValue === '' ? '-' : sanitizedValue;

  toggleHasChanges(true);

  sudokuStore.getValidateSudoku(model.value).then((validationResult) => {
    if (!validationResult.isWin) {
      return;
    }
    dialogIsWin.value?.openDialog();
  });

  nextTick(() => {
    (event.target as HTMLInputElement).value = sanitizedValue;
  });
};

watch(
  () => route.query.difficulty,
  () => {
    const difficulty = route.query.difficulty;

    if (!isDifficulty(difficulty)) {
      return goToPage404();
    }

    sudokuStore.getSudoku(difficulty).then((sudoku) => {
      model.value = sudoku.puzzle;

      toggleHasChanges(false);
      reset();
    });
  },
  { immediate: true },
);

const [hasChanges, toggleHasChanges] = useToggle();

onBeforeRouteUpdate(async (to, from, next) => {
  if (!to.query.difficulty) {
    return;
  }

  if (!hasChanges.value) {
    return next();
  }

  dialogConfirmation.value?.open();

  const { isCanceled } = await reveal();

  if (isCanceled) {
    return next(false);
  }

  next();
});

onBeforeRouteLeave(async (to, from, next) => {
  if (!hasChanges.value) {
    return next();
  }

  dialogConfirmation.value?.open();

  const { isCanceled } = await reveal();

  if (isCanceled) {
    return next(false);
  }

  next();
});

useEventListener('beforeunload', (event) => {
  if (!hasChanges.value) {
    return;
  }

  event.preventDefault();
});
</script>

<style>
.page-sudoku {
  .page-sudoku__sudoku-timer {
    display: flex;
    justify-content: center;

    .page-sudoku__sudoku-timer-time {
      font-size: 1.125rem;
      font-weight: bold;
      padding: 0.25rem;
      color: var(--color-zinc-800);
    }

    .page-sudoku__sudoku-timer-button {
      all: unset;
      cursor: pointer;
      color: var(--color-blue-950);
      transition: color 0.3s ease;

      &:hover {
        color: var(--color-blue-300);
      }
      &.page-sudoku__sudoku-timer-button--active {
        color: var(--color-blue-500);
      }
    }
  }

  .page-sudoku__buttons {
    display: flex;
    gap: 0.625rem;
    justify-content: center;
    padding: 1rem;
  }

  .page-sudoku__sudoku-grid {
    display: flex;
    justify-content: center;
    border-collapse: collapse;
    background-color: var(--color-white);
  }

  .page-sudoku__sudoku-cell {
    --cell-size: 1.2em;
    width: var(--cell-size);
    height: var(--cell-size);
    border: 1px solid var(--color-black);
    text-align: center;
    font-size: 1.5rem;

    &.page-sudoku__sudoku-cell_bold-border-bottom {
      border-bottom-width: 0.125rem;
    }

    &.page-sudoku__sudoku-cell_bold-border-right {
      border-right-width: 0.125rem;
    }

    &.page-sudoku__sudoku-cell_error {
      &:has(.page-sudoku__cell-input[readonly]) {
        background-color: var(--color-red-200);
      }

      .page-sudoku__cell-input:not([readonly]) {
        color: var(--color-red-600);
      }
    }
  }

  .page-sudoku__cell-input {
    all: unset;
    width: inherit;

    &:not([readonly]) {
      font-family: 'Kalam', cursive;
      color: var(--color-blue-900);
    }
  }
}
</style>
