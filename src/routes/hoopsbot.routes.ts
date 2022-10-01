import express from "express";
import cors from "cors";
import { corsConfig } from "../utilities/cors";

const hoopsbotRouter = express.Router();

hoopsbotRouter.get("/", cors(corsConfig), (req, res) => {
  res.send({ message: "NBA hot takes!" });
});

export default hoopsbotRouter;
