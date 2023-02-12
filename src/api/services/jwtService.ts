import { IAuthPayload } from "../interfaces/shared";
import jwt from 'jsonwebtoken'
import envValues from "../../config/envConfig";
import { env } from "process";

/**
 * 
 * @param userid to be included in the token
 * @param fullOriginAddress  remote address
 * @returns 
 */
const getUserVerificationURL=(userid:string,fullOriginAddress:string)=>{
    const token=jwt.sign({userid},envValues.jwtSecretToken,{expiresIn:"7d"})
    return fullOriginAddress+"api/auth/emailconfirmation"+token

}
const generateAuthorizationToken=(payload:IAuthPayload):string=>{
    return jwt.sign(payload,envValues.jwtSecretToken,{expiresIn:"7d"})
}
export {getUserVerificationURL.generateAuthorizationToken}