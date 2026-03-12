import {Handler} from "express";
import {catchAsync} from "../middleware/global.js";
import {
    createUserSubscription,
    deleteUserSubscription,
    getUser,
    getUserSubscriptionById,
    listUserSubscriptions,
    updateUserSubscription,
} from "../services/user.service.js";
import {sendResponse} from "../utils/response.js";


export const getProfile: Handler = catchAsync(async (req, res) => {
    const {email, id} = req.user;
    const user = await getUser({email, id}, {password_hash: 0, __v: 0 , subscriptions: 0 });
    return sendResponse(res, 200, user);
});

export const createSubscription: Handler = catchAsync(async (req, res) => {
    const userId = String(req.user.id);
    const created = await createUserSubscription(userId, req.body);
    return sendResponse(res, 201, created, "Subscription created");
});

export const listSubscriptions: Handler = catchAsync(async (req, res) => {
    const userId = String(req.user.id);
    const subscriptions = await listUserSubscriptions(userId);
    return sendResponse(res, 200, subscriptions);
});

export const getSubscription: Handler = catchAsync(async (req, res) => {
    const userId = String(req.user.id);
    const subscriptionId = String(req.params.subscriptionId);
    const subscription = await getUserSubscriptionById(userId, subscriptionId);
    return sendResponse(res, 200, subscription);
});

export const updateSubscription: Handler = catchAsync(async (req, res) => {
    const userId = String(req.user.id);
    const subscriptionId = String(req.params.subscriptionId);
    const updated = await updateUserSubscription(userId, subscriptionId, req.body);
    return sendResponse(res, 200, updated, "Subscription updated");
});

export const removeSubscription: Handler = catchAsync(async (req, res) => {
    const userId = String(req.user.id);
    const subscriptionId = String(req.params.subscriptionId);
    await deleteUserSubscription(userId, subscriptionId);
    return sendResponse(res, 200, null, "Subscription deleted");
});

export default {
    getProfile,
    createSubscription,
    listSubscriptions,
    getSubscription,
    updateSubscription,
    removeSubscription,
};