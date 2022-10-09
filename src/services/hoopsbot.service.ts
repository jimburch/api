import { Configuration, OpenAIApi } from "openai";
import { knex } from "../utilities/knex";
import { Take, TakeRecord } from "../models/hoopsbot.model";

const { OPENAI_AUTH, OPENAI_ORG } = process.env;

const configuration = new Configuration({
  organization: OPENAI_ORG,
  apiKey: OPENAI_AUTH,
});

const openai = new OpenAIApi(configuration);

export const generateTake = async (prompt: string): Promise<Take> => {
  const completion: Take = await openai
    .createCompletion({
      model: "text-davinci-002",
      prompt,
      n: 1,
      max_tokens: 500,
      temperature: 0.99,
      top_p: 1,
      best_of: 1,
    })
    .then((response) => {
      if (response.data.choices?.[0].text) {
        return new Take(response.data.choices?.[0].text.replace(/\n/g, ""));
      } else {
        throw new Error("Completion choice text is undefined");
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
  if (!completion) throw new Error("Could not generate OpenAI text completion");
  return completion;
};

export const saveNewTakeToDatabase = async (
  prompt: string
): Promise<TakeRecord> => {
  const { take, hot, cold, shares } = await generateTake(prompt);
  const savedTake = await knex("takes")
    .insert({
      take,
      hot,
      cold,
      shares,
    })
    .returning("*")
    .catch((error: string) => {
      throw new Error(error);
    });
  if (!savedTake) throw new Error("Could not save generated take");
  return savedTake[0];
};

export const updateTake = async (
  takeId: string,
  takeUpdate: TakeRecord
): Promise<TakeRecord> => {
  const { take, hot, cold, shares, created_at, updated_at } = takeUpdate;
  const updatedTake = await knex("takes")
    .update({
      take,
      hot,
      cold,
      shares,
      created_at,
      updated_at,
    })
    .where({ id: takeId })
    .returning("*")
    .catch((error: string) => {
      throw new Error(error);
    });
  if (!updatedTake) throw new Error("Could not update take");
  return updatedTake;
};
