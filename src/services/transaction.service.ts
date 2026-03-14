import { NotFoundError } from "../utils/errors.js";
import Transaction, { TransactionData } from "../models/Transaction.model.js";

const createTransaction = async (transactionData: TransactionData) => {
  const transaction = new Transaction(transactionData);
  return await transaction.save();
};

const updateTransaction = async (
  transactionId: string,
  transactionData: Partial<TransactionData>,
) => {
  const transaction = await Transaction.findByIdAndUpdate(
    transactionId,
    transactionData,
    { new: true },
  );

  if (!transaction) {
    throw new NotFoundError("Transaction not found");
  }

  return transaction;
};

const getTransactionsByUser = async (userId:string) =>{
    return await Transaction.find({ user: userId })
}
// admin/users/:userId/subscriptions/:subscriptionId/transactions
const getTransactionsBySubscription = async (subscriptionId:string) =>{
    return await Transaction.find({ subscription: subscriptionId })
}

export default {
  createTransaction,
  updateTransaction,
  getTransactionsByUser,
  getTransactionsBySubscription
};