import mongoose , {Document} from "mongoose";
export interface ISubscription extends Document {
    name: string;
    price: number;
    billing_cycle: "monthly" | "yearly";

}
export const subscriptionSchema = new mongoose.Schema<ISubscription>({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    billing_cycle:{
        type:String,
        enum:["monthly","yearly"],
        required:true
    },
} , {timestamps:true});

