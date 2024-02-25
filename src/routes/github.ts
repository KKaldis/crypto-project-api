import { Request, Response } from "express";
import express from "express";
const githubRoutes = express.Router();
//  * User Repos
import userReposRoute, { getUserRepos } from "./github/user-repos";
githubRoutes.use("/user-repos", userReposRoute);

//  * Org Repos
import orgReposRoute, { getOrgRepos } from "./github/org-repos";
githubRoutes.use("/org-repos", orgReposRoute);

//  * Weekly Commit Count
import weeklyCommitCountRoute, {
  getWeeklyCommitCount
} from "./github/weekly-commit-count";
githubRoutes.use("/weekly-commit-count", weeklyCommitCountRoute);

//  * Weekly Commit Activity
import weeklyCommitActivityRoute, {
  getWeeklyCommitActivity
} from "./github/weekly-commit-activity";
githubRoutes.use("/weekly-commit-activity", weeklyCommitActivityRoute);

//  * Repo Community Metrics
import communityProfileMetricsRoute, {
  getCommunityProfileMetrics
} from "./github/community-profile-metrics";
githubRoutes.use("/community-profile-metrics", communityProfileMetricsRoute);

//  * All Contributor Commit Activity
import allContributorCommitActivityRoute, {
  getAllContributorCommitActivity
} from "./github/all-contributor-commit-activity";
githubRoutes.use(
  "/all-contributor-commit-activity",
  allContributorCommitActivityRoute
);

//  * Last Year Commit Activity
import lastYearCommitActivityRoute, {
  getLastYearCommitActivity
} from "./github/last-year-commit-activity";
githubRoutes.use("/last-year-commit-activity", lastYearCommitActivityRoute);

//! This should scan the entire project
githubRoutes.use("/:project", async (req: Request, res: Response) => {
  const { project } = req.params;
  try {
    const [userReposRes, orgReposRes] = await Promise.all([
      getUserRepos(project),
      getOrgRepos(project)
    ]);

    const combinedRepos = [...userReposRes, ...orgReposRes];

    const uniqueRepos = new Set(combinedRepos);
    const allRepos = [...uniqueRepos];

    const getAllRepoInfo = async (
      project: string,
      repo: string
    ): Promise<any> => {
      return await Promise.all([
        getWeeklyCommitCount(project, repo),
        getWeeklyCommitActivity(project, repo),
        getCommunityProfileMetrics(project, repo),
        getAllContributorCommitActivity(project, repo),
        getLastYearCommitActivity(project, repo)
      ]);
    };

    res.status(200).send(allRepos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching repositories");
  }
});

export default githubRoutes;
