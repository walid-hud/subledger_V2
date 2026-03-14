import mongoose from 'mongoose';
import User, { IUserCreate } from '../models/User.model.js';
import Subscription from '../models/Subscription.model.js';
import { ConflictError, NotFoundError } from '../utils/errors.js';

export const createUser = async (userData: IUserCreate) => {
	const userExists = await User.findOne({ email: userData.email });
	if (userExists) {
		throw new ConflictError('A user with this email already exists');
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
	const filter = query.id ? { _id: query.id } : { email: query.email };
	const user = await User.findOne(filter, project || undefined);
	if (!user) {
		throw new NotFoundError('User not found');
	}
	return user;
};

export const createUserSubscription = async (
	userId: string,
	payload: {
		name: string;
		price: number;
		billing_cycle: 'monthly' | 'yearly';
	},
) => {
	const user = await User.findById(userId, '_id');
	if (!user) {
		throw new NotFoundError('User not found');
	}

	return await Subscription.create({
		...payload,
		user: user._id,
	});
};

export const listUserSubscriptions = async (userId: string) => {
	const user = await User.findById(userId, '_id');
	if (!user) {
		throw new NotFoundError('User not found');
	}

	return await Subscription.find({ user: user._id });
};

export const getUserSubscriptionById = async (
	userId: string,
	subscriptionId: string,
) => {
	const user = await User.findById(userId, '_id');
	if (!user) {
		throw new NotFoundError('User not found');
	}

	const subscription = await Subscription.findOne({
		_id: subscriptionId,
		user: user._id,
	});
	if (!subscription) {
		throw new NotFoundError('Subscription not found');
	}

	return subscription;
};

export const updateUserSubscription = async (
	userId: string,
	subscriptionId: string,
	patch: Partial<{
		name: string;
		price: number;
		billing_cycle: 'monthly' | 'yearly';
	}>,
) => {
	const user = await User.findById(userId , '_id');
	if (!user) {
		throw new NotFoundError('User not found');
	}

	const subscription = await Subscription.findOneAndUpdate(
		{ _id: subscriptionId, user: user._id },
		patch,
		{ new: true, runValidators: true },
	);
	if (!subscription) {
		throw new NotFoundError('Subscription not found');
	}

	return subscription;
};

export const deleteUserSubscription = async (
	userId: string,
	subscriptionId: string,
) => {
	const user = await User.findById(userId, '_id');
	if (!user) {
		throw new NotFoundError('User not found');
	}

	const deleted = await Subscription.findOneAndDelete({
		_id: subscriptionId,
		user: user._id,
	});
	if (!deleted) {
		throw new NotFoundError('Subscription not found');
	}
};

export const getAllUsers = async () => {
	return await User.find(
		{},
		{
			password_hash: 0,
			__v: 0,
		},
	);
};
