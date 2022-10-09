require("dotenv").config();
import express from "express";
import cors from "cors";
import passport from "passport";
import { Strategy } from "passport-http-bearer";

import hoopsbotRouter from "./routes/hoopsbot.routes";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

passport.use(
  new Strategy(async (token, done) => {
    if (token && token === process.env.BEARER_TOKEN) {
      return done(null, token);
    } else {
      return done(null, false);
    }
  })
);

app.use("/hoopsbot", hoopsbotRouter);

app.listen(PORT, () => {
  console.log(`We're kickin' on ${PORT} 🤘`);
});
