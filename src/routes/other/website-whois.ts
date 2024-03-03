import { WebsiteTechResopnse } from "@routes/github/models/website-tech.model";
import extractHostname from "@src/utils/extractHost";
import { Request, Response } from "express";
import express from "express";
import whoiser from "whoiser";

const websiteWhois = express.Router();

export const getWebsiteWhois = async (domain: string): Promise<any> => {
  const domainWhois = await whoiser(extractHostname(domain));

  console.log(domainWhois);

  return domainWhois;
};

websiteWhois.get(
  "/:domain",
  async (req: Request, res: Response<WebsiteTechResopnse | string>) => {
    const { domain } = req.params;
    try {
      const whoisData = await getWebsiteWhois(domain);

      res.json(whoisData);
    } catch (error: any) {
      console.error("Error fetching WHOIS data:", error);
      res.status(500).json("Failed to fetch WHOIS data.");
    }
  }
);

export default websiteWhois;
