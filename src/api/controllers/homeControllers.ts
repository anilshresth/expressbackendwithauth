import { Request,Response } from "express"

const Home=(req:Request,res:Response)=>{
    res.send("home data")

}
export {Home}