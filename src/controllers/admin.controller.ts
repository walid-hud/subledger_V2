import { getAllUsers , getUser } from "../services/user.service.js";
import { Handler } from "express";
import { catchAsync } from "../middleware/global.js";
import { sendResponse } from "../utils/response.js";



export const getUsers: Handler = catchAsync(async (req, res) => {
    const users = await getAllUsers();
    return sendResponse(res, 200, users);
});

export const getProfile: Handler = catchAsync(async (req, res) => {
    const user = await getUser({ email: req.user.email });
    return sendResponse(res, 200, user);
});

export const getUserDetails: Handler = catchAsync(async (req, res) => {
    
});

export default {
    getUsers,
    getProfile
};