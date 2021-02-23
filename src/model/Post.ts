import {
  booleanArg,
  extendType,
  FieldResolver,
  list,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { NexusGenObjects } from "../nexus-typegen";

export class PostModel extends Model {}
PostModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING },
    body: { type: DataTypes.STRING },
    published: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "Post", freezeTableName: true }
);

export type Post = NexusGenObjects["Post"];

export const PostSchema = objectType({
  name: "Post",
  definition(t) {
    t.id("id");
    t.string("title");
    t.string("body");
    t.boolean("published");
  },
});

export const PostQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("drafts", {
      type: nonNull(list(PostSchema)),
      resolve: async () => {
        const res = (await PostModel.findAll()) as Post[];
        return res;
      },
    });
  },
});

export const PostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPost", {
      type: nonNull(PostSchema),
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg()),
        published: nonNull(booleanArg()),
      },
      resolve: async () => {
        const res = await PostModel.build();
        await res.save();
        return res as Post;
      },
    });
  },
});
