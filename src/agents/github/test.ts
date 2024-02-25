import joinPublicChannel from "@agents/telegram/joinPublicChannel";
import sendTelegramMessage from "@agents/telegram/sendTelegrmMessage";
import { octokit } from "@inits/github";
import axios from "axios";
import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    // const { owner, repo } = req.params;
    const owner = "KKaldis";
    const repo = "platform-product-starter";

    const response1 = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`
    );

    const response2 = await octokit.request(
      `GET /repos/${owner}/${repo}/stats/code_frequency`,
      {
        owner: "OWNER",
        repo: "REPO",
        headers: {
          accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28"
        }
      }
    );

    console.log(response1.data);
    console.log(response2.data);

    res.json({ res1: response1.data, res2: response2.data });
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      res.status(500).json({ error: "No response from the server" });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).json({ error: error.message });
    }
  }

  // Immediately-invoked function expression (IIFE) to test the sendTelegramMessage function
  (async () => {
    joinPublicChannel("ExatechEN");

    // Call the sendTelegramMessage function with parameters from environment variables
    const { TOKEN, CHANNEL } = process.env;
    sendTelegramMessage(
      TOKEN!,
      CHANNEL!,
      "This is a test message with @codingWithAdo"
    );
  })();
});

module.exports = router;
