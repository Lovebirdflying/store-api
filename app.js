require('dotenv').config()
require('express-async-errors')
// asyc errors

const express = require('express');
const app = express();

const connectDB = require('./DB/connect')
const productsRouter = require('./routes/products')

const notFoundmiddleware = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/errorHandler')

//middleware

app.use(express.json())

//rootes

app.get('/', (req, res) =>{
 res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})



app.use('/api/v1/products', productsRouter)
// product route

app.use(notFoundmiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 2000

const start  = async() => {
    try{
        //connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening to port ${port}...`))

    }catch(error){
 console.log(error)
    }
}

start();