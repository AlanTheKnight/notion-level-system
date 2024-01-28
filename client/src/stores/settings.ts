import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => {
    return {
      showLostXP: true,
      refreshPeriod: 30,
    };
  },
  actions: {
    toggleShowLostXP() {
      this.showLostXP = !this.showLostXP;
    },
    setRefreshPeriod(period: number) {
      this.refreshPeriod = period;
    },
  },
  persist: true,
});
