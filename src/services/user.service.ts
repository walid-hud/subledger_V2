import User from "../models/User.model.js";
import { ConflictError, NotFoundError } from "../utils/errors.js";

export const createUser = async (userData: {
  username: string;
  email: string;
  password_hash: string;
  role: "admin" | "user";
  subscriptions?: any[];
}) => {
  const userExists = await User.findOne({email:userData.email})
  if(userExists){
    throw new ConflictError("A user with this email already exists")
  }
  const user = await User.create(userData)
  return await user.save();
};

export const getUser = async (userData:{
  email:string 
}) =>{
  const user = await User.findOne({email:userData.email}).lean()
  if(!user){
    throw new NotFoundError("User not found")
  }
  return user
}