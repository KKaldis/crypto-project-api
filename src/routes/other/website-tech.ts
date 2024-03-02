import { WebsiteTechResopnse } from "@routes/github/models/website-tech.model";
import axios from "axios";
import { Request, Response } from "express";
import express from "express";
const websiteTech = express.Router();

export const getWebsiteTechUrl = (url: string): string => {
  return `https://ingredients.tech/api/ingredients?url=${url}`;
};

export const getWebsiteTech = async (url: string): Promise<any> => {
  const response = await axios.get(getWebsiteTechUrl(url));
  return response;
};

websiteTech.get(
  "/:url",
  async (req: Request, res: Response<WebsiteTechResopnse>) => {
    const { url } = req.params;

    try {
      const fearGreed = await getWebsiteTech(url);
      res.json(fearGreed.data);
    } catch (error: any) {
      console.log(error);
    }
  }
);

export default websiteTech;
