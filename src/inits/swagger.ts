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
        "304": {
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
    post: {
      tags: ["Github"],
      summary: "Get all github data",
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
        "304": {
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
  "/github/user-repos/{githubUser}/": {
    post: {
      tags: ["Github"],
      summary: "Get current API status",
      description:
        "Get the current API status, mode (Development / Production) and version.",
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
        "304": {
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
  "/github/org-repos/{githubUser}/": {
    post: {
      tags: ["Github"],
      summary: "Get current API status",
      description:
        "Get the current API status, mode (Development / Production) and version.",
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
        "304": {
          description: "Success",
          content: {
            "text/html": { example: "Mode: DEVELOPMENT - Version: 0.1" }
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
