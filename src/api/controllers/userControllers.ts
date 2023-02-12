import { Request,Response } from "express"

const User=(req:Request,res:Response)=>{
    res.send("home data")

}
export {User}