import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";
dotenv.config();

const { VERSION, PORT } = process.env;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crypto Project Statistics API",
      version: VERSION as string,
      description: `The Crypto Project Statistics API is a service designed to provide 
      real-time statistical insights and analytics for various cryptocurrency projects. 
      This API offers developers access to a wide range of data points and metrics, 
      including market capitalization, trading volume, price trends, circulating supply, 
      and more, for individual cryptocurrencies or aggregated across multiple projects. 
      By leveraging this API, developers can build applications, tools, 
      and services that enable users to track, analyze, 
      and make informed decisions within the dynamic cryptocurrency ecosystem. 
      Whether for portfolio management, market research, or algorithmic trading, 
      the Crypto Project Statistics API empowers developers to harness the power 
      of data-driven insights in the world of cryptocurrencies.`
    },
    servers: [{ url: `http://localhost:${PORT}` }]
  },
  apis: ["./**.ts"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
