import {
  FearAndGreedData,
  FearAndGreedResponse
} from "@routes/github/models/fear-greed.mode";
import axios from "axios";
import { Request, Response } from "express";
import express from "express";
const fearGreed = express.Router();

export const getFearGreedUrl = (limit: number): string => {
  return `https://api.alternative.me/fng/?limit=${limit}`;
};

export const getFearGreed = async (
  limit: number
): Promise<FearAndGreedResponse> => {
  const response = await axios.get(getFearGreedUrl(limit));
  return response.data;
};

fearGreed.get(
  "/:limit",
  async (req: Request, res: Response<FearAndGreedData[]>) => {
    const { limit } = req.params;

    try {
      const fearGreed = await getFearGreed(Number(limit));
      res.json(fearGreed.data);
    } catch (error: any) {
      console.log(error);
    }
  }
);

export default fearGreed;
