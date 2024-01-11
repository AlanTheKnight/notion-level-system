import { Client } from "@notionhq/client";

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
      date: page.properties.Date.date.start,
    };
  });
};

export const getUserXP = async () => {
  const quests = await getQuests();
  let XP = 0,
    totalXP = 0;
  quests.forEach((quest) => {
    if (quest.status === "Done") XP += quest.xp;
    totalXP += quest.xp;
  });
  return { XP, totalXP };
};

export const getUserInfo = async () => {
  const response = await notion.users.list({});
  const user = response.results.filter((u) => u.type === "person")[0];

  return {
    name: user.name,
    avatar: user.avatar_url,
    level: await getUserLevel(),
  };
};

export const getUserLevel = async () => {
  const startXP = 10;

  const { XP, totalXP } = await getUserXP();
  let XP_counter = XP;

  let i = 0;
  let lvl = 1;
  while (XP > 0) {
    let curLvlXP = startXP * Math.round(Math.pow(1.15, i));
    if (XP_counter < curLvlXP) {
      return {
        lvl,
        XP,
        totalXP,
        cur: XP_counter,
        max: curLvlXP,
      };
    }
    XP_counter -= curLvlXP;
    lvl++;
    i++;
  }
};
