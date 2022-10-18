import cron from "node-cron";
import { tweetNewTake } from "../services/hoopsbot.service";

cron.schedule("0 1 * * *", () => {
  tweetNewTake(
    "Write a controversial NBA hot take in the style of a tweet in 280 characters or less."
  );
});
