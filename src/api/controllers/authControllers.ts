import { Request,Response } from "express"
import { IAuthPayload } from "../interfaces/shared"
import {body,validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'
import passport from "passport"
import { generateAuthorizationToken,getUserVerificationURL } from "../services/jwtService"
import { createUser } from "../services/userServices"
import envValues from "../../config/envConfig"
import users,{IUser} from "../models/users"
import HttpStatusCodes from "../utils/HttpStatusCodes"
import { isTypeQueryNode } from "typescript"


const returnErrorMessage=(res:Response,errroMessage:unknown)=>{
    if(typeof errroMessage==='string'){
        res.status(HttpStatusCodes.BAD_REQUEST).json({message:errroMessage})

    }
    if(errroMessage instanceof Error){
        res.status(HttpStatusCodes.BAD_REQUEST).json({message:errroMessage.message +"->"+errroMessage.stack})

    }
    res.status(HttpStatusCodes.BAD_REQUEST).json({message:errroMessage})

}
const registerUser=async(req:Request,res:Response)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(HttpStatusCodes.BAD_REQUEST).json({message:errors.array()})
    }
    try{
        const user=await createUser(req.body.username,req.body.email,req.body.password)
        if(typeof user==="string"){
            returnErrorMessage(res,"user was not created"+user)
        }
        const requesOriginAddress=req.protocol+"://"+req.get("host")
        const verificationURL=getUserVerificationURL(user._id,requesOriginAddress)
        
    }catch(error){
        returnErrorMessage(res,error)
    }

}

const signUp=[
    body('email').trim().normalizeEmail(),
    body('username').trim().isLength(8),
    body('password',"password should have atleast 8 character in length").isStrongPassword({
        minLength:8,
        minUppercase:1,
        minNumbers:1,
        minSymbols:0,
        minLowercase:1
    }),
    registerUser
]

const singIn=async(req:Request,res:Response)=>{
    passport.authenticate('local',{session:false,failureRedirect:"/"},(err,user:IUser)=>{

        if(err || !user){
            res.status(HttpStatusCodes.BAD_REQUEST).json({message:err})

        }
        //we create the payload to be encrypted then in the jwt
        const payload:IAuthPayload={
            id:user._id,
            username:user.username,
            email:user.email
        }
        try{
            //generate a signed json webtoken and return it in response
            const token=generateAuthorizationToken(payload)
            //assign our jwt to the cookie if you comment this then Authorization bearer would be used
            if(envValues.tokenFromCookie){
                res.cookie(envValues.jwtCookieName,token,{httpOnly:true})
            }
            res.status(HttpStatusCodes.OK).json({...payload,token})

        }catch(error){
            res.status(HttpStatusCodes.BAD_REQUEST).json({message:error})
        }
        return

    })(req,res)
}

const verifyAccount=async(req:Request,res:Response)=>{
    try{
        const jwtPayload=jwt.verify(req.params.token,envValues.jwtSecretToken)
        if(typeof jwtPayload==='string' || !jwtPayload.id){
            res.status(HttpStatusCodes.BAD_REQUEST).json(jwtPayload)
            return
        }
        const userID=await users.findById(jwtPayload.id).exec()
        if(!userID){
            res.status(HttpStatusCodes.BAD_REQUEST).json({message:"invalid user "})
            return
        }
        userID.verified=true
        await userID.save()
        res.status(HttpStatusCodes.OK).json({message:"email confirmed succesfuly"})

    }catch(error){
            res.status(HttpStatusCodes.BAD_REQUEST).json({message:error})
    }
    return
}
export {signUp,singIn,verifyAccount}