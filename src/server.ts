import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import { schema } from "./schema";

const PORT = process.env.PORT;

const server = new ApolloServer({ schema });

server.start().then(() => {
  const app = express();

  app.use("/static", express.static("files"));
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  app.listen({ port: PORT });

  console.log(`🚀 Server is running on http://localhost:${PORT}/graphql`);
});
