import envValues from "../../config/envConfig";
import bcrypt from 'bcryptjs'
import User,{IUser} from '../models/users'

const createUser=async(username:string,email:string,password:string):Promise<IUser |string>=>{
    try{
        //verify the user is unique
        const existingUser=await User.find({$or:[{username,email}]})

        if(existingUser.length >0){
            return 'the user already exist please sign with new address'
        }
        const user=new User({username,password:await bcrypt.hash(password,envValues.SaltLength),email})
        return await user.save()


    }
    catch(error){
        throw new Error("Error creating new user"+error)
    }

}
export {createUser}