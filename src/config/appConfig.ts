import express,{Application} from 'express'
import compression from 'compression'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { HomeRouter} from '../api/router/homeRoutes'
import {engine} from 'express-handlebars'



const app:Application=express()
const path=require('path')
const handlebars=require('express-handlebars')

app.set("port",process.env.Port||3000)
app.set('views',path.resolve(__dirname,'../views'))
app.engine('handlebars',engine())
app.set('view engine','handlebars')
// console.log(path.resolve(__dirname,'../api/public'))
app.use('/static',express.static(path.resolve(__dirname,'../api/public')))
app.enable('view cache')
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.text({type:"text/plain"}))
app.use(compression())
app.use(cookieParser())
app.use("/api/home",HomeRouter())


export default app;

