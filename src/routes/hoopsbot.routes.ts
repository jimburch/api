import express from "express";
import cors from "cors";
import { corsConfig } from "../utilities/cors";
import passport from "passport";
import { generate, save } from "../controllers/hoopsbot.controller";

const hoopsbotRouter = express.Router();

hoopsbotRouter.get(
  "/",
  cors(corsConfig),
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    res.send({ message: "NBA hot takes!" });
  }
);

hoopsbotRouter.get(
  "/generate",
  cors(corsConfig),
  passport.authenticate("bearer", { session: false }),
  async (req, res) => await generate(req, res)
);

hoopsbotRouter.post(
  "/new",
  cors(corsConfig),
  passport.authenticate("bearer", { session: false }),
  async (req, res) => await save(req, res)
);

export default hoopsbotRouter;
