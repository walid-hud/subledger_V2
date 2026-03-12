import mongoose from "mongoose";
import User, { IUser } from "../models/User.model.js";
import {ConflictError, NotFoundError} from "../utils/errors.js";

export const createUser = async (userData: {
  username: string;
  email: string;
  password_hash: string;
  role: "admin" | "user";
  subscriptions?: any[];
}) => {
  const userExists = await User.findOne({email: userData.email});
  if (userExists) {
    throw new ConflictError("A user with this email already exists");
  }
  const user = await User.create(userData);
  return await user.save();
};

export const getUser = async (
  query: {
    email: string;
    id?: string;
  },
  project?: mongoose.ProjectionType<any>,
) => {
  const user = await User.findOne({email: query.email}, project || undefined);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};

export const createUserSubscription = async (
  userId: string,
  payload: {name: string; price: number; billing_cycle: "monthly" | "yearly"},
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  user.subscriptions.push(payload as any);
  await user.save();
  return user.subscriptions[user.subscriptions.length - 1];
};

export const listUserSubscriptions = async (userId: string) => {
  const user = await User.findById(userId, "subscriptions");
  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user.subscriptions;
};

export const getUserSubscriptionById = async (
  userId: string,
  subscriptionId: string,
) => {
  const user = await User.findById(userId, "subscriptions");
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const subscription = (user.subscriptions as any).id(subscriptionId);
  if (!subscription) {
    throw new NotFoundError("Subscription not found");
  }

  return subscription;
};

export const updateUserSubscription = async (
  userId: string,
  subscriptionId: string,
  patch: Partial<{
    name: string;
    price: number;
    billing_cycle: "monthly" | "yearly";
  }>,
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const subscription = (user.subscriptions as any).id(subscriptionId);
  if (!subscription) {
    throw new NotFoundError("Subscription not found");
  }

  Object.assign(subscription, patch);
  await user.save();
  return subscription;
};

export const deleteUserSubscription = async (
  userId: string,
  subscriptionId: string,
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const subscription = (user.subscriptions as any).id(subscriptionId);
  if (!subscription) {
    throw new NotFoundError("Subscription not found");
  }

  subscription.deleteOne();
  await user.save();
};
