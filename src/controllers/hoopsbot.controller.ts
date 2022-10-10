import { Request, Response } from "express";
import { Take, TakeRecord } from "../models/hoopsbot.model";
import {
  deleteTake,
  generateTake,
  getRandomTake,
  saveNewTakeToDatabase,
  updateTake,
} from "../services/hoopsbot.service";

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

export const getRandom = async (
  req: Request,
  res: Response
): Promise<Response<TakeRecord>> => {
  try {
    const randomTake = await getRandomTake();
    if (!randomTake) return res.status(400).send("Could not get random take");
    return res.status(200).send(randomTake);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const save = async (
  req: Request,
  res: Response
): Promise<Response<Take>> => {
  const prompt = req.query.prompt as string;
  if (!prompt) return res.status(400).send("Missing text prompt");
  try {
    const savedTake = await saveNewTakeToDatabase(prompt);
    if (!savedTake)
      return res.status(400).send("Could not save new take to database");
    return res.status(201).send(savedTake);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response<TakeRecord>> => {
  const takeId = req.params.id as string;
  const takeBody = req.body as TakeRecord;
  if (
    !takeBody ||
    !takeId ||
    !Object.keys(takeBody).includes("hot") ||
    !Object.keys(takeBody).includes("cold") ||
    !Object.keys(takeBody).includes("shares")
  )
    return res
      .status(400)
      .send("Missing take update body or required properties");
  try {
    const updatedTake = await updateTake(takeId, takeBody);
    if (!updatedTake) return res.status(400).send("Could not update take");
    return res.status(200).send(updatedTake);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response<TakeRecord>> => {
  const takeId = req.params.id as string;
  if (!takeId) return res.status(400).send("Missing take id");
  try {
    const deletedTake = await deleteTake(takeId);
    if (!deletedTake) return res.status(400).send("Could not delete take");
    return res.status(202).send(deletedTake);
  } catch (error) {
    return res.status(500).send(error);
  }
};
