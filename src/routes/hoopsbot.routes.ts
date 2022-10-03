import express from "express";
import cors from "cors";
import { corsConfig } from "../utilities/cors";
import passport from "passport";

const hoopsbotRouter = express.Router();

hoopsbotRouter.get(
  "/",
  cors(corsConfig),
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    res.send({ message: "NBA hot takes!" });
  }
);

export default hoopsbotRouter;
