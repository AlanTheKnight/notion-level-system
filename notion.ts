import { Client } from "@notionhq/client";
import { dayDiff } from "./date_utils";

const notion = new Client({
  auth: process.env.NOTION_API_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID as string;

export const getQuests = async () => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results.map((page) => {
    return {
      id: page.id,
      title: page.properties.Title.title[0].text.content,
      status: page.properties.Status.status.name,
      xp: page.properties.XP.number,
      date: new Date(page.properties.Date.date.start),
      punish: page.properties.Punish.number,
    };
  });
};

export const getUserXP = async () => {
  const quests = await getQuests();
  let failedQuests = 0,
    failedXP = 0;
  let XP = 0,
    totalXP = 0;
  quests.forEach((quest) => {
    if (quest.status === "Done") XP += quest.xp;
    if (quest.status === "Failed" || dayDiff(quest.date) >= 1) {
      XP -= quest.punish;
      failedQuests++;
      failedXP += quest.punish;
    }
    totalXP += quest.xp;
  });
  return { XP: Math.max(XP, 0), totalXP, failedQuests, failedXP };
};

export const getUserInfo = async () => {
  const response = await notion.users.list({});
  const user = response.results.filter((u) => u.type === "person")[0];
  const level = await getUserLevel();

  return {
    name: user.name,
    avatar: user.avatar_url,
    level,
  };
};

export const getUserLevel = async () => {
  const startXP = 10;

  const { XP, totalXP, failedQuests, failedXP } = await getUserXP();
  let XP_counter = XP;

  let i = 0;
  let lvl = 1;
  while (XP > 0) {
    let curLvlXP = Math.round(startXP * Math.pow(1.2, i));
    if (XP_counter < curLvlXP) {
      return {
        lvl,
        XP,
        totalXP,
        cur: XP_counter,
        max: curLvlXP,
        failedQuests,
        failedXP,
      };
    }
    XP_counter -= curLvlXP;
    lvl++;
    i++;
  }
};
