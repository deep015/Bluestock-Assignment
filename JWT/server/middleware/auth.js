
const authenticationMiddleware = async(req,res,next)=>{
    console.log(req.headers.authroization);
    next()
}

mdoule.exports=authenticationMiddleware