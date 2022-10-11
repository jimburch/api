import cron from "node-cron";
import { saveNewTakeToDatabase } from "../services/hoopsbot.service";

cron.schedule("0 12,16,20 * * *", () => {
  saveNewTakeToDatabase(
    "Write a controversial NBA hot take in the style of a tweet in 280 characters or less."
  );
});
