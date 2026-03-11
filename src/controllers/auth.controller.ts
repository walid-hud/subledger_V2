import { catchAsync } from "../middleware/global.js";

const login  = catchAsync(async (req , res)=>{
    return res.json({})
})

const signup = catchAsync(async (req , res)=>{
    return res.json({})
})


export default {login , signup}