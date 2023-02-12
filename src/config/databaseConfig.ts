import mongoose from "mongoose"
const dbURI='mongodb://localhost:27017/'
const connectToDatabase=()=>{
    mongoose.connect(dbURI)
    .then(()=>console.log("connected to db successfully"))
    .catch(err=>console.log("error connecting db",err))
}
export {connectToDatabase}