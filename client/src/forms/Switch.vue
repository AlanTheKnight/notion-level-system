<script setup lang="ts">
import { computed } from "vue";

interface SwitchProps {
  label?: string;
  modelValue: boolean;
}

const props = defineProps<SwitchProps>();

const model = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>

<template>
  <div class="switch-wrapper">
    <div class="label" v-if="props.label">{{ props.label }}</div>
    <label class="switch">
      <input type="checkbox" v-model="model" />
      <span class="slider"></span>
    </label>
  </div>
</template>

<style scoped>
.switch-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.switch {
  position: relative;
  display: inline-block;
  width: 2.1rem;
  height: 1.1rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--lvl-dark-grey);
  -webkit-transition: transform 0.4s;
  transition: transform 0.4s;
  border-radius: 2rem;
}

.slider:before {
  position: absolute;
  content: "";
  height: 0.8rem;
  width: 0.8rem;
  left: 0.2rem;
  bottom: 0.15rem;
  background-color: var(--lvl-text);
  -webkit-transition: transform 0.4s;
  transition: transform 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--lvl-primary);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--lvl-primary);
}

input:checked + .slider:before {
  -webkit-transform: translateX(0.9rem);
  -ms-transform: translateX(0.9rem);
  transform: translateX(0.9rem);
}
</style>
