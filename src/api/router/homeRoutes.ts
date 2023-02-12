import {Home} from '../controllers/homeControllers'
import { Request,Response } from 'express'
import {Router} from 'express'
import { strict } from 'assert'


const HomeRouter=()=>{
    var options={
        strict:true,
        caseSensitive:false
    }
    const router=Router(options)
    router.get('/',(req:Request,res:Response)=>{
        res.send("the get page")
    })
    router.get("/about",(req:Request,res:Response)=>{
        res.send("about from the home page")
    })
    router.get("/sendimage",(req,res)=>{
        res.render("index",{name:"anil shrestha"})
    })
    return router
}
export {HomeRouter}
