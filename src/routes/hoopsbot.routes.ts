import express from "express";
import cors from "cors";
import { corsConfig } from "../utilities/cors";
import passport from "passport";
import {
  generate,
  getRandom,
  remove,
  save,
  tweet,
  update,
} from "../controllers/hoopsbot.controller";

const hoopsbotRouter = express.Router();

hoopsbotRouter.get(
  "/generate",
  cors(corsConfig),
  passport.authenticate("bearer", { session: false }),
  async (req, res) => await generate(req, res)
);

hoopsbotRouter.get(
  "/random",
  // cors(corsConfig),
  passport.authenticate("bearer", { session: false }),
  async (req, res) => await getRandom(req, res)
);

hoopsbotRouter.post(
  "/new",
  cors(corsConfig),
  passport.authenticate("bearer", { session: false }),
  async (req, res) => await save(req, res)
);

hoopsbotRouter.post(
  "/tweet",
  cors(corsConfig),
  passport.authenticate("bearer", { session: false }),
  async (req, res) => await tweet(req, res)
);

hoopsbotRouter.put(
  "/update/:id",
  cors(corsConfig),
  passport.authenticate("bearer", { session: false }),
  async (req, res) => await update(req, res)
);

hoopsbotRouter.delete(
  "/delete/:id",
  cors(corsConfig),
  passport.authenticate("bearer", { session: false }),
  async (req, res) => await remove(req, res)
);

export default hoopsbotRouter;
