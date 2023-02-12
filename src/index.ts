import express,{ Express,Request,Response } from "express";
import dotenv from 'dotenv'
import app from './config/appConfig'
import { connectToDatabase } from './config/databaseConfig'
  
const main=()=>{
    connectToDatabase()
    app.listen(app.get("port"|| 3000),()=> {
        console.log('server listening to port',app.get("port"))
    })
}
main()