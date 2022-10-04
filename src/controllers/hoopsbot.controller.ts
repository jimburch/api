import { Request, Response } from "express";
import { Take } from "../models/hoopsbot.model";
import { generateTake } from "../services/hoopsbot.service";

export const generate = async (
  req: Request,
  res: Response
): Promise<Response<Take>> => {
  const prompt = req.query.prompt as string;
  if (!prompt) return res.status(400).send("Missing text prompt");
  try {
    const take = await generateTake(prompt);
    if (!take) return res.status(400).send("Could not generate take");
    return res.status(200).send(take);
  } catch (error) {
    return res.status(500).send(error);
  }
};
