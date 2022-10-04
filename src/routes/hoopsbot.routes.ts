import express from "express";
import cors from "cors";
import { corsConfig } from "../utilities/cors";
import passport from "passport";
import { generate } from "../controllers/hoopsbot.controller";

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
  async (req, res) => generate(req, res)
);

export default hoopsbotRouter;
