import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const creatTask = mutation({
  args: {
    title: v.string(),
    isCompleted: v.optional(v.boolean()),
    type: v.string(),
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
      type: args.type,
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

export const bold = mutation({
  args: {
    id: v.id("tasks"),
    bold: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch(args.id, { bold: args.bold });
  },
});

export const underline = mutation({
  args: {
    id: v.id("tasks"),
    underline: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch(args.id, { underline: args.underline });
  },
});

export const italic = mutation({
  args: {
    id: v.id("tasks"),
    italic: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch(args.id, { italic: args.italic });
  },
});

export const highlight = mutation({
  args: {
    id: v.id("tasks"),
    highlight: v.boolean(),
    color: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch(args.id, {
      highlight: args.highlight,
      highlightColor: args.color,
    });
  },
});

export const url = mutation({
  args: {
    id: v.id("tasks"),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch(args.id, { url: args.url });
  },
});

export const deleteTask = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Unauthorized");
    }
    await ctx.db.delete(args.id);
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

    return allTask;
  },
});

export const getTaskById = query({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Unauthorized");
    }
    const task = await ctx.db.get(args.id);
    if (task?.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }
    return task;
  },
});
