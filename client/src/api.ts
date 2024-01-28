export interface UserLevel {
  lvl: number;
  XP: number;
  totalXP: number;
  cur: number;
  max: number;
  failedQuests: number;
  failedXP: number;
  availableXP: number;
}

export interface UserInfo {
  name: string;
  avatar: string;
  level: UserLevel;
}

export const fetchUserLevel = async () => {
  const res = (await (await fetch("/user-info")).json()) as UserInfo;
  return res;
};

export interface DailyQuest {
  id: string;
  title: string;
  status: string;
  xp: number;
  date: string;
  punish: number;
}

export const fetchDailyQuests = async () => {
  const res = (await (await fetch("/daily")).json()) as DailyQuest[];
  return res;
};
