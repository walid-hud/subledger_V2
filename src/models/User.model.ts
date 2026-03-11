import mongoose, {InferSchemaType, Document} from "mongoose";
import {subscriptionSchema} from "./Subscription.model.js";
// we have to extend the Document interface to include mongoose 
// document properties and methods (like _id, save, etc.)
export interface IUser extends Document {
  username: string;
  email: string;
  password_hash: string;
  subscriptions: InferSchemaType<typeof subscriptionSchema>[];
  role: "admin" | "user";
  
}

export type IUserCreate = {
  username: string;
  email: string;
  password_hash: string;
  role?: "admin" | "user";
  subscriptions?: InferSchemaType<typeof subscriptionSchema>[];
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  /*
    we use embedded documents instead of referencing for 
    subscriptions sincea user can't have too many subscriptions 
    and it simplifies the data retrieval process
    */
  subscriptions: [subscriptionSchema],
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
