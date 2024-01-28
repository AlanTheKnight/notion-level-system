<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchDailyQuests, type DailyQuest } from "./api";

const quests = ref<null | DailyQuest[]>(null);

onMounted(async () => {
  const dailyQuests = await fetchDailyQuests();
  quests.value = dailyQuests;
});
</script>

<template>
  <div class="card" v-if="quests !== null">
    <div id="dailySummary">
        {{ quests }}
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  min-height: 150px;
  border: 1px solid var(--lvl-dark-grey);
  border-radius: 5px;
  padding: 1.5rem;
  box-sizing: border-box;
  margin-top: 1rem;
}
</style>
