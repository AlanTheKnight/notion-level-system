<script setup lang="ts">
import { computed } from "vue";
import { type UserInfo } from "./api";
import Skeleton from "./Skeleton.vue";
import { useSettingsStore } from "./stores/settings";

interface UserCardProps {
  data: UserInfo | null;
}

const props = defineProps<UserCardProps>();

const lvlProgress = computed(() =>
  props.data === null
    ? ""
    : (props.data.level.cur / props.data.level.max) * 100 + "%"
);

const settings = useSettingsStore();
</script>

<template>
  <div v-if="data !== null" id="userCard">
    <div id="avatarWrapper">
      <img :src="data.avatar" :alt="data.name + '\'s avatar'" id="avatar" />
    </div>
    <div id="userInfoWrapper">
      <div id="userInfoTop">
        <div id="username">{{ data.name }}</div>
        <div id="level">Level {{ data.level.lvl }}</div>
      </div>
      <div id="levelInfoWrapper">
        <div id="progressBar">
          <div id="progressBarFiller" :style="{ width: lvlProgress }"></div>
        </div>
        <div id="curLevel">{{ data.level.cur }} / {{ data.level.max }}</div>
      </div>
      <div id="xpAvailableWrapper">
        Available:
        {{ data.level.availableXP }}
        XP
      </div>
      <div
        v-if="settings.showLostXP && data.level.failedQuests !== 0"
        id="failedInfo"
      >
        Failed:
        <span id="failedQuests"
          >{{ data.level.failedQuests }}
          {{ data.level.failedQuests > 1 ? "quests" : "quest" }}</span
        >
        for {{ data.level.failedXP }} XP
      </div>
    </div>
  </div>
  <div v-else id="userCard">
    <div id="avatarWrapper">
      <Skeleton width="15vw" height="15vw" rounded />
    </div>

    <div id="userInfoWrapper">
      <div id="userInfoTop">
        <Skeleton width="50%" height="3.6vw" />
        <Skeleton width="1.5rem" height="3.6vw" />
      </div>
      <div id="levelInfoWrapper">
        <Skeleton width="100%" height="3.6vw" />
        <Skeleton
          width="8%"
          height="calc(3.6vw * 0.8)"
          style="margin-left: 0.5rem"
        />
      </div>
      <div id="xpAvailableWrapper" style="width: 100%">
        <Skeleton width="80%" height="calc(3.6vw * 0.8)" />
      </div>
      <div id="failedInfo" style="width: 100%" v-if="settings.showLostXP">
        <Skeleton width="80%" height="calc(3.6vw * 0.8)" />
      </div>
    </div>
  </div>
</template>

<style>
#userCard {
  width: 100%;
  min-height: 150px;
  border: 1px solid #464646;
  border-radius: 5px;
  padding: 1.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}

#avatarWrapper {
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1.5rem;
}

#avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#userInfoWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
}

#username {
  font-size: 1rem;
  font-weight: bold;
}

#levelInfoWrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-bottom: 0.7rem;
}

#progressBar {
  width: 100%;
  height: 3.6vw;
  background-color: #464646;
  border-radius: 5px;
  margin-right: 0.5rem;
}

#progressBarFiller {
  height: 100%;
  background-color: #8d69f8;
  border-radius: 5px;
}

#userInfoTop {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.7rem;
}

#level {
  font-weight: bold;
}

#curLevel {
  font-size: 0.8rem;
  color: #a0a0a0;
  white-space: nowrap;
}

#xpAvailableWrapper {
  color: #a0a0a0;
  white-space: nowrap;
  font-size: 0.8rem;
  margin-bottom: 0.4rem;
}

#failedInfo {
  color: #a0a0a0;
  white-space: nowrap;
  font-size: 0.8rem;
}
</style>
