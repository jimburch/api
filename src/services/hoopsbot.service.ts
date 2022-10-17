import { Configuration, OpenAIApi } from "openai";
import { TweetV1, TwitterApi } from "twitter-api-v2";
import { knex } from "../utilities/knex";
import { Take, TakeRecord } from "../models/hoopsbot.model";

// congifure openai
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_AUTH,
});
const openai = new OpenAIApi(configuration);

// configure twitter
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY || "",
  appSecret: process.env.TWITTER_API_KEY_SECRET || "",
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});
const rwClient = twitterClient.readWrite;

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

export const deleteTake = async (takeId: string): Promise<TakeRecord> => {
  const deletedTake = await knex("takes")
    .update({ deleted_at: new Date() })
    .where({ id: takeId })
    .returning("*")
    .catch((error: string) => {
      throw new Error(error);
    });
  if (!deletedTake) throw new Error("Could not delete take");
  return deletedTake;
};

export const getRandomTake = async (): Promise<TakeRecord> => {
  const randomTake = await knex("takes")
    .where({ deleted_at: null })
    .orderByRaw("RANDOM()")
    .first()
    .catch((error: string) => {
      throw new Error(error);
    });
  if (!randomTake) throw new Error("Could not get random take");
  return randomTake;
};

export const tweetNewTake = async (prompt: string): Promise<TweetV1 | void> => {
  const { take } = await saveNewTakeToDatabase(prompt);
  try {
    const postTweet = await rwClient.v1.tweet(take);
    if (!postTweet) throw new Error("Could not post tweet");
    console.log("@HoopsBotAI tweeted: ", take);
    return postTweet;
  } catch (error) {
    console.error(error);
  }
};
