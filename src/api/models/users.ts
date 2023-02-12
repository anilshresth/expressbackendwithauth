import { Schema,model,Document } from "mongoose";


export interface IUser extends Document{
    username:string
    email:string
    password:string
    verified:boolean
}

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:4,
        lowercase:true
    },

  password: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  verified: { type: Boolean, required: true, default: false },
})

export default model<IUser>("User",userSchema)