import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./model";

export const schema = makeSchema({
  types,
  nonNullDefaults: {
    input: false,
    output: false,
  },
  outputs: {
    typegen: join(__dirname, "nexus-typegen.ts"),
    schema: join(__dirname, "schema.graphql"),
  },
});
