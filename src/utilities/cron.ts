import { exit } from "process";
import { saveNewTakeToDatabase } from "../services/hoopsbot.service";

saveNewTakeToDatabase(
  "Write a controversial NBA hot take in the style of a tweet in 280 characters or less."
).then(() => {
  exit();
});
