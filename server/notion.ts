import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_API_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID as string;

const pageTransform = (page: PageObjectResponse) => {
  return {
    id: page.id,
    title: page.properties.Title.title[0].text.content,
    status: page.properties.Status.status.name,
    xp: page.properties.XP.number,
    date: new Date(page.properties.Date.date.start),
    punish: page.properties.Punish.number,
    // tags: page.properties.Tags.multi_select.map((tag) => tag.name),
  };
};

export const getQuests = async () => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results.map(pageTransform);
};

export const getUserXP = async () => {
  const quests = await getQuests();
  let failedQuests = 0,
    failedXP = 0,
    XP = 0,
    totalXP = 0,
    availableXP = 0;
  quests.forEach((quest) => {
    if (quest.status === "Done") {
      XP += quest.xp;
    } else if (quest.status === "Failed") {
      XP -= quest.punish;
      failedQuests++;
      failedXP += quest.punish;
    } else {
      availableXP += quest.xp;
    }
    totalXP += quest.xp;
  });
  XP = Math.max(XP, 0);
  return { XP, totalXP, failedQuests, failedXP, availableXP };
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

  const { XP, totalXP, failedQuests, failedXP, availableXP } =
    await getUserXP();
  let XP_counter = XP;

  let i = 0;
  let lvl = 1;
  while (XP >= 0) {
    let curLvlXP = Math.round(startXP * Math.pow(1.2, i));
    if (XP_counter < curLvlXP) {
      return {
        lvl,
        XP,
        totalXP,
        cur: XP_counter,
        max: curLvlXP,
        availableXP,
        failedQuests,
        failedXP,
      };
    }
    XP_counter -= curLvlXP;
    lvl++;
    i++;
  }
};

export const getDailyQuestInfo = async () => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Tags",
      multi_select: {
        contains: "Daily",
      },
    },
  });

  const quests = response.results.map(pageTransform);

  const dailyQuests = new Map<string, (typeof quests)[0]>();
  quests.forEach((quest) => {
    dailyQuests.set(quest.title, quest);
  });

  const today = new Date().toISOString().substring(0, 10);

  const completedQuests = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Tags",
          multi_select: {
            contains: "Daily",
          },
        },
        {
          property: "Date",
          date: {
            equals: today,
          },
        },
      ],
    },
  });

  const dailyToday = completedQuests.results.map(pageTransform);
  let completed = dailyToday.filter((quest) => quest.status === "Done");
  let failed = dailyToday.filter((quest) => quest.status === "Failed");
  const completedOrFailed = [...completed, ...failed].map((i) => i.title);
  let available = Array.from(dailyQuests.values()).filter(
    (quest) => !completedOrFailed.includes(quest.title)
  );

  completed = completed.map((q) => {
    return {
      ...q,
      status: "Done",
      date: new Date(today),
    };
  });

  failed = failed.map((q) => {
    return {
      ...q,
      status: "Failed",
      date: new Date(today),
    };
  });

  available = available.map((q) => {
    return {
      ...q,
      status: "Pending",
      date: new Date(today),
    };
  });

  return [...completed, ...failed, ...available];
};
