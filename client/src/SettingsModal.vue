<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import Switch from "./forms/Switch.vue";
import Select from "./forms/Select.vue";
import { useSettingsStore } from "./stores/settings";
import { computed } from "vue";

const emit = defineEmits<{
  (e: "confirm"): void;
}>();

const settingsStore = useSettingsStore();

const showLostXP = computed({
  get: () => settingsStore.showLostXP,
  set: (value: boolean) => (settingsStore.showLostXP = value),
});

const refreshPeriod = computed({
  get: () => settingsStore.refreshPeriod.toString(),
  set: (value: string) => (settingsStore.refreshPeriod = parseInt(value)),
});
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1 class="text-center">Settings</h1>

    <div>
      <Switch label="Show lost XP" v-model="showLostXP" />
    </div>

    <div class="input-wrapper">
      <div>Refresh period</div>
      <Select
        id="refreshPeriod"
        v-model="refreshPeriod"
        :options="[
          ['15', '15 seconds'],
          ['30', '30 seconds'],
          ['60', '1 minute'],
        ]"
      />
    </div>

    <!-- <div class="text-center">
      <button @click="emit('confirm')">Save</button>
    </div> -->
  </VueFinalModal>
</template>

<style>
.text-center {
  width: 100%;
  text-align: center;
}

.input-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.input-wrapper > *:first-child {
  width: 50%;
}

.input-wrapper > *:last-child {
  width: 40%;
}

.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.confirm-modal-content {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  background: var(--lvl-modal-background);
  border-radius: 0.5rem;
  width: 80%;
  font-size: 1rem;
}

.confirm-modal-content > * + * {
  margin: 0.5rem 0;
}

.confirm-modal-content h1 {
  font-size: 1.375rem;
}

.dark .confirm-modal-content {
  background: #000;
}

.confirm-modal-content button {
  background-color: var(--lvl-primary);
  border-color: var(--lvl-primary);
  color: #fff;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  border: 1px solid transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.confirm-modal-content button:hover {
  background-color: var(--lvl-primary-dark);
  border-color: var(--lvl-primary-dark);
}

.confirm-modal-content button:focus {
  outline: 0;
  box-shadow: var(--lvl-btn-shadow);
}
</style>
