import express from "express";
import { getUserInfo, getDailyQuestInfo } from "./notion";

const app = express();
const port = 9000;

app.use(express.static("../dist"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/user-info", (req, res) => {
  getUserInfo().then((user) => {
    res.json(user);
  });
});

app.get("/daily", (req, res) => {
  getDailyQuestInfo().then((quest) => {
    res.json(quest);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
