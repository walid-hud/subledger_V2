import mongoose, {InferSchemaType, Document} from "mongoose";
// we have to extend the Document interface to include mongoose 
// document properties and methods (like _id, save, etc.)
export interface IUser extends Document {
  username: string;
  email: string;
  password_hash: string;
  role: "admin" | "user";
  
}

export type IUserCreate = {
  username: string;
  email: string;
  password_hash: string;
  role?: "admin" | "user";
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
    index: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
