import { Octokit } from "octokit";

const { GITHUB_OCTOKIT_TOKEN } = process.env;

const octokit = new Octokit({
  auth: GITHUB_OCTOKIT_TOKEN
});

export { octokit };
