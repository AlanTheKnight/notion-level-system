import express from "express";
import { getQuests, getUserInfo, getUserLevel } from "./notion";

const app = express();
const port = 9000;

app.use(express.static("public"));
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

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
