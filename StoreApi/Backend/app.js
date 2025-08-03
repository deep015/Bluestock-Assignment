require('dotenv').config()
require('express-async-errors')

const express=require('express')
const app=express()
const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')
const connectDB=require('./db/connect')
const productRouter = require('./routes/products')
//middleware
app.use(express.json())

//routes
app.get('/',(req,res)=>{
    res.send('<h1>Store Api </h1><a href="/api/v1/products">Products routes</a>')
})

app.use('/api/v1/products',productRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware ) 
const port=process.env.PORT || 3000
const start = async()=>{
    try {
        //connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`listening on port ${port}` )
        })
    } catch (error) {
        console.log(error)
    }   
}
 start()