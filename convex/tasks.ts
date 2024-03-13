import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const creatTask = mutation({
  args: {
    title: v.string(),
    isCompleted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Unauthorized");
    }
    const task = await ctx.db.insert("tasks", {
      title: args.title,
      userId: identity.subject,
      isCompleted: args.isCompleted || false,
      bold: false,
      underline: false,
      italic: false,
      highlight: false,
      highlightColor: "",
      url: "",
    });

    return task;
  },
});

export const markCompleted = mutation({
  args: {
    id: v.id("tasks"),
    markAs: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch(args.id, { isCompleted: args.markAs });
  },
});

export const getAllTask = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Unauthorized");
    }
    const allTask = await ctx.db
      .query("tasks")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();
    console.log(allTask);

    return allTask;
  },
});
