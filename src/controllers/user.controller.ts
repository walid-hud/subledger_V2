import { Handler } from "express";
import { catchAsync } from "../middleware/global.js";
import { getUser } from "../services/user.service.js";
import { sendResponse } from "../utils/response.js";

const getUserProfile: Handler = catchAsync(async (req, res) => {
  const { email, id } = req.user;
  const user = await getUser({ email });
  return sendResponse(res, 200, user);
});

