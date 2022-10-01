import express from "express";
import cors from "cors";

import hoopsbotRouter from "./routes/hoopsbot.routes";

const PORT = process.env.PORT || 8080;

const app = express();

// Middleware
app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

// Routers
app.use("/hoopsbot", hoopsbotRouter);

app.listen(PORT, () => {
  console.log(`We're kickin' on ${PORT} 🤘`);
});
