import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "postgres://postgres:admin@127.0.0.1:5432/gql-sqlize"
);