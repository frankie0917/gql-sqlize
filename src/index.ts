import express from "express";
import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";
import { sequelize } from "./db";

async function main() {
  const app = express();

  const server = new ApolloServer({ schema });

  server.applyMiddleware({ app });

  await sequelize.sync({
    alter: true,
    force: true,
  });

  const port = process.env.PORT;

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
    console.log(
      `Graphql listening on http://localhost:${port}${server.graphqlPath}`
    );
  });
}

main();
