require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors=require('cors')
const connectDB = require('./db/connect');
const app = express();

const mainRouter= require('./routes/main')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

//routes
app.use('/api/v1',mainRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start =async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(3000,()=>{
            console.log('listening on port 3000')
        })
    } catch (error) {
        console.log(error)
    }
}

start()