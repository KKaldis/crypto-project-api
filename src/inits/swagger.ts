import swaggerJsdoc, { Paths, SwaggerDefinition } from "swagger-jsdoc";
import dotenv from "dotenv";
import { SwaggerOptions } from "swagger-ui-express";
dotenv.config();

const { VERSION, PORT } = process.env;

const paths: Paths = {
  "/status": {
    get: {
      tags: ["General"],
      summary: "Get current API status",
      description:
        "Get the current API status, mode (Development / Production) and version.",
      responses: {
        "200": {
          description: "Success",
          content: {
            "text/html": { example: "Mode: DEVELOPMENT - Version: 0.1" }
          }
        },
        "404": { description: "Not found" },
        "500": { description: "Internal server error" }
      }
    }
  },
  "/github/{githubUser}": {
    get: {
      tags: ["Github"],
      summary: "Get all user/organization data",
      description:
        "Returns organizations repos, user repos, repos statistics such as last year, last week etc. It calls all the the available github endpoints for all available repos.",
      parameters: [
        {
          in: "path",
          name: "githubUser",
          required: true,
          schema: {
            type: "string"
          },
          description: "The GitHub user to fetch data for"
        }
      ],
      responses: {
        "200": {
          description: "Success",
          content: {
            "application/json": {}
          }
        },
        "404": { description: "Not found" },
        "500": { description: "Internal server error" }
      }
    }
  },
  "/github/user-repos/{githubUser}": {
    get: {
      tags: ["Github"],
      summary: "Get user repos",
      description: "Get 30 user repos.",
      parameters: [
        {
          in: "path",
          name: "githubUser",
          required: true,
          schema: {
            type: "string"
          },
          description: "The GitHub user to fetch data for"
        }
      ],
      responses: {
        "200": {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                $ref: "#src/routes/github/models/user-repos.model.ts"
              }
            }
          }
        },
        "404": { description: "Not found" },
        "500": { description: "Internal server error" }
      }
    }
  },
  "/github/org-repos/{githubUser}": {
    get: {
      tags: ["Github"],
      summary: "Get organization repos",
      description: "Get 30 of the organization repos.",
      parameters: [
        {
          in: "path",
          name: "githubUser",
          required: true,
          schema: {
            type: "string"
          },
          description: "The GitHub organization to fetch data for"
        }
      ],
      responses: {
        "200": {
          description: "Success",
          content: {
            "application/json": {}
          }
        },
        "404": { description: "Not found" },
        "500": { description: "Internal server error" }
      }
    }
  },
  "/github/weekly-commit-count/{githubUser}/{githubRepo}": {
    get: {
      tags: ["Github"],
      summary: "Get weekly commit count",
      description:
        "Returns the total commit counts for the owner and total commit counts in all. all is everyone combined, including the owner in the last 52 weeks. If you'd like to get the commit counts for non-owners, you can subtract owner from all. The array order is oldest week (index 0) to most recent week. The most recent week is seven days ago at UTC midnight to today at UTC midnight.",
      parameters: [
        {
          in: "path",
          name: "githubUser",
          required: true,
          schema: {
            type: "string"
          },
          description: "The GitHub user / organization to fetch data for"
        },
        {
          in: "path",
          name: "githubRepo",
          required: true,
          schema: {
            type: "string"
          },
          description: "The GitHub repo to fetch data for"
        }
      ],
      responses: {
        "200": {
          description: "Success",
          content: {
            "application/json": {}
          }
        },
        "404": { description: "Not found" },
        "500": { description: "Internal server error" }
      }
    }
  },
  "/github/weekly-commit-activity/{githubUser}/{githubRepo}": {
    get: {
      tags: ["Github"],
      summary: "Get repo weekly commit activity",
      description:
        "Returns a weekly aggregate of the number of additions and deletions pushed to a repository. Note: This endpoint can only be used for repositories with fewer than 10,000 commits. If the repository contains 10,000 or more commits, a 422 status code will be returned.",
      parameters: [
        {
          in: "path",
          name: "githubUser",
          required: true,
          schema: {
            type: "string"
          },
          description: "The GitHub user / organization to fetch data for"
        },
        {
          in: "path",
          name: "githubRepo",
          required: true,
          schema: {
            type: "string"
          },
          description: "The GitHub repo to fetch data for"
        }
      ],
      responses: {
        "200": {
          description: "Success",
          content: {
            "application/json": { example: "Mode: DEVELOPMENT - Version: 0.1" }
          }
        },
        "404": { description: "Not found" },
        "422": { description: "Repository contains 10,000 or more commits" },
        "500": { description: "Internal server error" }
      }
    }
  },
  "/github/community-profile-metrics/{githubUser}/{githubRepo}": {
    get: {
      tags: ["Github"],
      summary: "Get repo community profile metrics",
      url: "https://docs.github.com/en/rest/metrics/community#get-community-profile-metrics",
      description:
        "Returns all community profile metrics for a repository. The repository cannot be a fork. The returned metrics include an overall health score, the repository description, the presence of documentation, the detected code of conduct, the detected license, and the presence of ISSUE_TEMPLATE, PULL_REQUEST_TEMPLATE, README, and CONTRIBUTING files. The health_percentage score is defined as a percentage of how many of the recommended community health files are present. For more information, see 'About community profiles for public repositories.' content_reports_enabled is only returned for organization-owned repositories.",
      parameters: [
        {
          in: "path",
          name: "githubUser",
          required: true,
          schema: {
            type: "string"
          },
          description: "The GitHub user / organization to fetch data for"
        },
        {
          in: "path",
          name: "githubRepo",
          required: true,
          schema: {
            type: "string"
          },
          description: "The GitHub repo to fetch data for"
        }
      ],
      responses: {
        "200": {
          description: "Success",
          content: {
            "application/json": {}
          }
        },
        "404": { description: "Not found" },
        "500": { description: "Internal server error" }
      }
    }
  },
  "/github/all-contributor-commit-activity/{githubUser}/{githubRepo}": {
    get: {
      tags: ["Github"],
      summary: "Get total number of commits authored by the contributor",
      description: `Returns the total number of commits authored by the contributor. In addition, the response includes a Weekly Hash (weeks array) with the following information:

    w - Start of the week, given as a Unix timestamp.
    a - Number of additions
    d - Number of deletions
    c - Number of commits

    Note: This endpoint will return 0 values for all addition and deletion counts in repositories with 10,000 or more commits.`,
      parameters: [
        {
          in: "path",
          name: "githubUser",
          required: true,
          schema: {
            type: "string"
          },
          description: "The GitHub user / organization to fetch data for"
        },
        {
          in: "path",
          name: "githubRepo",
          required: true,
          schema: {
            type: "string"
          },
          description: "The GitHub repo to fetch data for"
        }
      ],
      responses: {
        "200": {
          description: "Success",
          content: {
            "application/json": {}
          }
        },
        "404": { description: "Not found" },
        "500": { description: "Internal server error" }
      }
    }
  },
  "/github/last-year-commit-activity/{githubUser}/{githubRepo}": {
    get: {
      tags: ["Github"],
      summary: "Get last year of commit activity",
      description:
        "Returns the last year of commit activity grouped by week. The days array is a group of commits per day, starting on Sunday.",
      parameters: [
        {
          in: "path",
          name: "githubUser",
          required: true,
          schema: {
            type: "string"
          },
          description: "The GitHub user / organization to fetch data for"
        },
        {
          in: "path",
          name: "githubRepo",
          required: true,
          schema: {
            type: "string"
          },
          description: "The GitHub repo to fetch data for"
        }
      ],
      responses: {
        "200": {
          description: "Success",
          content: {
            "application/json": {}
          }
        },
        "404": { description: "Not found" },
        "500": { description: "Internal server error" }
      }
    }
  },
  "/telegram/get-channel-total-members/{channelName}/": {
    get: {
      tags: ["Telegram"],
      summary: "Get channel total members",
      description: "Returns the total members of a telegram channel.",
      parameters: [
        {
          in: "path",
          name: "channelName",
          required: true,
          schema: {
            type: "string"
          },
          description: `The Telegram channel name / invite url / id
            
    ID schema: -1001272071252
    Invite URL schema: https://t.me/flashtokenenglish
    Name schema: flashtokenenglish`
        }
      ],
      responses: {
        "200": {
          description: "Success",
          content: {
            "application/json": { example: 3666 }
          }
        },
        "404": { description: "Not found" },
        "500": { description: "Internal server error" }
      }
    }
  },
  "/discrod/get-server-total-members/{serverInvite}/": {
    get: {
      tags: ["Discord"],
      summary: "Get channel total members",
      description: "Returns the total members of a telegram channel.",
      parameters: [
        {
          in: "path",
          name: "serverInvite",
          required: true,
          schema: {
            type: "string"
          },
          description: `The Discord server invite url`
        }
      ],
      responses: {
        "200": {
          description: "Success",
          content: {
            "application/json": { example: 3666 }
          }
        },
        "404": { description: "Not found" },
        "500": { description: "Internal server error" }
      }
    }
  },
  "/other/fear-greed/{limit}": {
    get: {
      tags: ["Other"],
      summary: "Fear Greed",
      description: "Returns the Fear Greed index.",
      parameters: [
        {
          in: "path",
          name: "limit",
          required: true,
          schema: {
            type: "number"
          },
          description: `Return latest number of {limit} results`
        }
      ],
      responses: {
        "200": {
          description: "Success",
          content: {
            "application/json": {
              example: [
                {
                  value: "80",
                  value_classification: "Extreme Greed",
                  timestamp: "1709337600",
                  time_until_update: "84816"
                }
              ]
            }
          }
        },
        "404": { description: "Not found" },
        "500": { description: "Internal server error" }
      }
    }
  }
};

const definition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Crypto Project Evaluation API",
    version: VERSION as string,
    description: `The Crypto Project Evaluation API is a service designed to provide 
      real-time statistical insights and analytics for various cryptocurrency projects. 
      This API offers developers access to a wide range of data points and metrics, 
      including market capitalization, trading volume, price trends, circulating supply, 
      and more, for individual cryptocurrencies or aggregated across multiple projects. 
      By leveraging this API, developers can build applications, tools, 
      and services that enable users to track, analyze, 
      and make informed decisions within the dynamic cryptocurrency ecosystem. 
      Whether for portfolio management, market research, or algorithmic trading, 
      the Crypto Project Evaluation API empowers developers to harness the power 
      of data-driven insights in the world of cryptocurrencies.`
  },
  servers: [
    { url: `http://localhost:${PORT}`, description: "Development Server" }
  ],
  paths
};

const options: SwaggerOptions = {
  definition,
  apis: ["@src/server.ts"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
