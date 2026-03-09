import express , {NextFunction, Request , Response }from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import { config } from "dotenv"
config()

//---//
const server = express()
server.use(morgan("dev"))
server.use(cors())
server.use(express.json())
server.use(cookieParser())


// catch all
server.use((_,res)=>{
    return res.status(404).json({success:false, error:"not found"})
})

// global error handler
server.use((err : Error, _: Request, res : Response, __: NextFunction )=>{
    console.error(err)
    return res.status(500).send("something went wrong")
})


server.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})