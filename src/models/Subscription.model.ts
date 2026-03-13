import mongoose , {Document} from "mongoose";
export interface ISubscription extends Document {
    name: string;
    price: number;
    billing_cycle: "monthly" | "yearly";
    status: "active" | "cancelled";
    user: mongoose.Types.ObjectId;

}
export const subscriptionSchema = new mongoose.Schema<ISubscription>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },    
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
    status:{
        type:String,
        enum:["active","cancelled"],
        default:"active"
    }
} , {timestamps:true});

