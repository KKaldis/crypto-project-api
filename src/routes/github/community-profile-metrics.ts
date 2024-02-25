import axios from "axios";
import { Request, Response } from "express";
import express from "express";
const communityProfileMetricsRoute = express.Router();

export const getCommunityProfileMetricsUrl = (
  owner: string,
  repo: string
): string => {
  // https://api.github.com/repos/{owner}/{repo}/community/profile
  // https://docs.github.com/en/rest/metrics/community?apiVersion=2022-11-28#get-community-profile-metrics

  const { GITHUB_BASE_URL } = process.env;
  return `${GITHUB_BASE_URL}/repos/${owner}/${repo}/community/profile`;
};

export const getCommunityProfileMetrics = async (
  owner: string,
  repo: string
): Promise<any> => {
  const response = await axios.get(getCommunityProfileMetricsUrl(owner, repo));
  return response.data;
};

communityProfileMetricsRoute.get(
  "/:owner/:repo",
  async (req: Request, res: Response) => {
    const { owner, repo } = req.params;

    try {
      const commitActivity = await getCommunityProfileMetrics(owner, repo);
      res.json(commitActivity);
    } catch (error: any) {
      console.log(error);
    }
  }
);

export default communityProfileMetricsRoute;
