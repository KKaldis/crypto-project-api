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
  },
  "/other/website-tech/{url}": {
    get: {
      tags: ["Other"],
      summary: "Website Technologies",
      description: "Returns the Fear Greed index.",
      parameters: [
        {
          in: "path",
          name: "url",
          required: true,
          schema: {
            type: "string"
          },
          description: `Return latest number of {limit} results`
        }
      ],
      responses: {
        "200": {
          description: "Success",
          content: {
            "application/json": {
              example: {
                url: "https://qb-gon.com",
                matching_ingredients: 10,
                matches: {
                  analytics: [
                    {
                      id: "google-analytics",
                      name: "Google Analytics",
                      description:
                        "Google Analytics is a comprehensive web analytics service offered by Google.",
                      icon: "/icon/google-analytics.png",
                      match_percentage: 42.2
                    },
                    {
                      id: "google-tag-manager",
                      name: "Google Tag Manager",
                      description:
                        "Google Tag Manager is a web-based tool by Google that allows website owners and marketers to manage and deploy various tracking codes and tags on their websites.",
                      icon: "/icon/google-tag-manager.png",
                      match_percentage: 47.9
                    }
                  ],
                  cms: [
                    {
                      id: "wordpress",
                      name: "WordPress",
                      description:
                        "WordPress is a widely-used open-source content management system (CMS) that enables users to create and manage websites and blogs.",
                      icon: "/icon/wordpress.png",
                      match_percentage: 20.7
                    }
                  ],
                  libraries: [
                    {
                      id: "jquery",
                      name: "jQuery",
                      description:
                        "jQuery is a JavaScript library that simplifies HTML DOM tree traversal and manipulation, as well as event handling, CSS animation, and Ajax.",
                      icon: "/icon/jquery.png",
                      match_percentage: 43.1
                    }
                  ],
                  other: [
                    {
                      id: "gzip",
                      name: "Gzip",
                      description:
                        "Gzip compression is a lossless data compression algorithm that is used to reduce the size of files.",
                      icon: "/icon/zip.png",
                      match_percentage: 90.6
                    },
                    {
                      id: "json-schema",
                      name: "JSON Schema",
                      description:
                        "JSON Schema is used to create structured data on the Internet, on web pages, in email messages, and beyond.",
                      icon: "/icon/json-schema.png",
                      match_percentage: 39.9
                    },
                    {
                      id: "php",
                      name: "PHP",
                      description:
                        "PHP is a general-purpose, server-side scripting language that is especially suited for web development.",
                      icon: "/icon/php.png",
                      match_percentage: 9.5
                    },
                    {
                      id: "rss",
                      name: "RSS",
                      description:
                        "RSS stands for Really Simple Syndication. It is a format for delivering regularly updated content, such as news headlines or blog posts, to subscribers.",
                      icon: "/icon/rss.png",
                      match_percentage: 21.2
                    }
                  ],
                  security: [
                    {
                      id: "hsts",
                      name: "HSTS",
                      description:
                        "HSTS (HTTP Strict Transport Security) is a security mechanism that forces browsers to only connect to a website over HTTPS.",
                      icon: "/icon/hsts.png",
                      match_percentage: 48.4
                    }
                  ],
                  servers: [
                    {
                      id: "nginx",
                      name: "Nginx",
                      description:
                        "Nginx (pronounced 'engine-x') is an open-source web server, reverse proxy, and mail proxy.",
                      icon: "/icon/nginx.png",
                      match_percentage: 14.2
                    }
                  ]
                }
              }
            }
          }
        },
        "404": { description: "Not found" },
        "500": { description: "Internal server error" }
      }
    }
  },
  "/other/website-whois/{domain}": {
    get: {
      tags: ["Other"],
      summary: "Domain whois",
      description: "Returns whois information",
      parameters: [
        {
          in: "path",
          name: "domain",
          required: true,
          schema: {
            type: "string"
          },
          description: `Return the {domain} whois`
        }
      ],
      responses: {
        "200": {
          description: "Success",
          content: {
            "application/json": {
              example: {
                domainName: "QB-GON.COM",
                registryDomainId: "2024645388_DOMAIN_COM-VRSN",
                registrarWhoisServer: "whois.papaki.gr",
                registrarUrl: "https://www.papaki.com",
                updatedDate: "2022-11-10T00:10:35",
                creationDate: "2016-04-28T16:46:43",
                registrarRegistrationExpirationDate: "2024-04-28T16:46:43",
                registrar: "Enartia Single Member S.A.",
                registrarIanaId: "1727",
                reseller: "Enartia S.A.",
                domainStatus:
                  "clientTransferProhibited https://icann.org/epp#clientTransferProhibited clientUpdateProhibited https://icann.org/epp#clientUpdateProhibited",
                registrantName: "REDACTED FOR PRIVACY",
                registrantOrganization: "REDACTED FOR PRIVACY",
                registrantStreet: "REDACTED FOR PRIVACY",
                registrantCity: "REDACTED FOR PRIVACY",
                registrantStateProvince: "Patisia",
                registrantPostalCode: "REDACTED FOR PRIVACY",
                registrantCountry: "GR",
                registrantPhone: "REDACTED FOR PRIVACY",
                registrantFax: "REDACTED FOR PRIVACY",
                registrantEmail:
                  "https://tieredaccess.com/contact/018b84eb-a9be-4d19-bf66-d7ad8600ae37",
                adminName: "REDACTED FOR PRIVACY",
                adminOrganization: "REDACTED FOR PRIVACY",
                adminStreet: "REDACTED FOR PRIVACY",
                adminCity: "REDACTED FOR PRIVACY",
                adminStateProvince: "REDACTED FOR PRIVACY",
                adminPostalCode: "REDACTED FOR PRIVACY",
                adminCountry: "REDACTED FOR PRIVACY",
                adminPhone: "REDACTED FOR PRIVACY",
                adminFax: "REDACTED FOR PRIVACY",
                adminEmail: "REDACTED FOR PRIVACY",
                techName: "REDACTED FOR PRIVACY",
                techOrganization: "REDACTED FOR PRIVACY",
                techStreet: "REDACTED FOR PRIVACY",
                techCity: "REDACTED FOR PRIVACY",
                techStateProvince: "REDACTED FOR PRIVACY",
                techPostalCode: "REDACTED FOR PRIVACY",
                techCountry: "REDACTED FOR PRIVACY",
                techPhone: "REDACTED FOR PRIVACY",
                techFax: "REDACTED FOR PRIVACY",
                techEmail: "REDACTED FOR PRIVACY",
                nameServer: "ns1141.papaki.gr ns2141.papaki.gr",
                dnssec: "unsigned",
                registrarAbuseContactEmail: "abuse@papaki.com",
                registrarAbuseContactPhone: "+30.2118002275",
                urlOfTheIcannWhoisDataProblemReportingSystem:
                  "https://icann.org/wicf",
                lastUpdateOfWhoisDatabase: "2024-03-03T12:25:59Z <<<"
              }
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
