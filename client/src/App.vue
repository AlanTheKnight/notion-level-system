<script setup lang="ts">
import DailyQuests from "./DailyQuests.vue";
import UserCard from "./UserCard.vue";
import SettingsIcon from "./icons/SettingsIcon.vue";
import RefreshIcon from "./icons/RefreshIcon.vue";

import { type UserInfo, fetchUserLevel } from "./api";
import { onMounted, ref } from "vue";
import { ModalsContainer, useModal } from "vue-final-modal";
import SettingsModal from "./SettingsModal.vue";
import { useSettingsStore } from "./stores/settings";

const settings = useSettingsStore();

const data = ref<UserInfo | null>(null);

const refreshData = () => {
  data.value = null;
  fetchUserLevel().then((res) => {
    data.value = res;
  });
};

onMounted(() => {
  refreshData();
});

const { open, close } = useModal({
  component: SettingsModal,
});

setInterval(() => {
  refreshData();
}, 1000 * settings.refreshPeriod);
</script>

<template>
  <ModalsContainer />
  <div id="user-card-wrapper">
    <UserCard :data="data" />
    <div class="buttons-pane">
      <div class="btn settings-btn" @click="open">
        <SettingsIcon />
      </div>
      <div class="btn refresh-btn" @click="refreshData">
        <RefreshIcon />
      </div>
    </div>
  </div>
  <!-- <DailyQuests /> -->
</template>

<style scoped>
#user-card-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.btn {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--lvl-dark-grey);
  border-radius: 5px;
  padding: 0.3rem;
  margin-left: 0.5rem;
}

.settings-btn {
  margin-bottom: 0.5rem;
}

.btn:hover {
  background-color: var(--lvl-dark-grey);
}

.btn:hover svg {
  transform: scale(1.1);
}
</style>
