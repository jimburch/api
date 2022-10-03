import { CorsOptions } from "cors";

const NODE_ENV = process.env.NODE_ENV;

const corsWhiteListDev = ["*"];

const corsWhiteListProd = ["*"];

export const corsConfig: CorsOptions = {
  origin: NODE_ENV === "production" ? corsWhiteListProd : corsWhiteListDev,
  optionsSuccessStatus: 200,
  credentials: true,
};
