require("dotenv").config();
import cron from "node-cron";
import { tweetNewTake } from "../services/hoopsbot.service";

const NODE_ENV = process.env.NODE_ENV;
console.log(`NODE_ENV: ${NODE_ENV}`);

cron.schedule("0 1 * * *", () => {
  tweetNewTake(
    "Write a controversial NBA hot take in the style of a tweet in 280 characters or less."
  );
});
