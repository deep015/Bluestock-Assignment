const express = require('express');
const connectDB = require('./db/connect')
const app = express();
const cors = require('cors');
const tasks = require('./routes/tasks');

//const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

require('dotenv').config()
    


//middleware

app.use(cors()); // Add this before your routes
app.use(express.json());
//app.use(notFound)
app.use(errorHandlerMiddleware)

// routes
app.get('/hello', (req, res) => {
    res.send('Task Manager App');
});

app.use('/api/v1/tasks', tasks);  // ✅ Correct router usage
app.get('/api/v1/tasks', tasks); // ❌ Incorrect router usage
const port = 3000;

const start =async ()=>{
    try{
            await connectDB(process.env.MONGO_URI)
            app.listen(port, () => {
             console.log(`Server is running on port ${port}`);
});
    }
    catch(error){
        console.log(error)
    }   
}

start()