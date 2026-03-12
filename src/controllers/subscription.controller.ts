import { Handler} from "express";
import { catchAsync } from "../middleware/global.js";
import { getUser } from "../services/user.service.js";
import { sendResponse } from "../utils/response.js";


export const getProfile: Handler = catchAsync(async (req, res)=>{
    const {email , id} = req.user 
    const user = await getUser({email ,id} , "-password_hash -__v -subscriptions")
    return sendResponse(res , 200 , user)
})



export default {getProfile}