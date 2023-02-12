import passport  from "passport";

const getJwtTokenValidator=()=>{
    return passport.authenticate('jwt',{session:false})

}
export {getJwtTokenValidator}