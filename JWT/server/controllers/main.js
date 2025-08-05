
//check username ,password in post(login) request
//if exist create a new JWT
//SEND back to frontend

//setup authentication so only the request with JWT CAN Access the dashboard

const CustomAPIError= require('../errors/custom-error')
const jwt = require('jsonwebtoken');


const login=async(req,res)=>{
    const {username,password}=req.body
    if(!username || !password){
        throw new CustomAPIError('Please provide email and password',400)
    }
    const id = new Date().getDate()

      console.log('JWT_SECRET:', process.env.JWT_SECRET);
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    console.log(token)
    res.status(200).json({msg:'user created',token})
}


const dashboard= async(req,res)=>{
    const authHeader= req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided',401)
    }

    const token = authHeader.split(' ')[1];
   try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const {id,username} = {id,username}
        req.user = {id,username}
        next()
        const luckyNumber = Math.floor(Math.random() * 100)
        res.status(200).json({msg:`hello ${decoded.username}`,secret:`your lucky number is ${luckyNumber}`})
        console.log(decoded)
   } catch (error) {
        throw new CustomAPIError('Not authorized to access this route',401)
   }
    
}

module.exports={login,dashboard}