import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    title: v.string(),
    isCompleted: v.boolean(),
    userId: v.string(),
    bold: v.optional(v.boolean()),
    underline: v.optional(v.boolean()),
    italic: v.optional(v.boolean()),
    highlight: v.optional(v.boolean()),
    highlightColor: v.optional(v.string()),
    url: v.optional(v.string()),
  }).index("by_userId", ["userId"]),
});
