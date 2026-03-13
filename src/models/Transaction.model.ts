import mongoose , {Document} from "mongoose";
export interface ITransaction extends Document {
    user: mongoose.Types.ObjectId;
    subscription: mongoose.Types.ObjectId;
    amount: number;
    paymentDate: Date;
    status: "paid" | "failed";
}

export const transactionSchema = new mongoose.Schema<ITransaction>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
        required:true
    },
    amount:{
        type:Number,
        required:true,
        min:0
    },
    paymentDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:["paid","failed"],
        required:true
    }
} , {timestamps:true});


const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;