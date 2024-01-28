<!-- Select component -->

<script setup lang="ts">
import { computed } from "vue";

interface SelectProps {
  options: [string, string][];
  modelValue: string;
}

const props = defineProps<SelectProps>();

const model = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const options = computed(() =>
  props.options.map((option) => ({
    value: option[0],
    label: option[1],
  }))
);
</script>

<template>
  <select v-model="model">
    <option v-for="option in options" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped>
/* Custom styling for select ignoring browser defaults */

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border: none;
  background-color: var(--lvl-dark-grey);
  color: var(--lvl-light-grey);
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 1rem;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
}

select::-ms-expand {
  display: none;
}
</style>
