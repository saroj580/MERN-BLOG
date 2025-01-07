import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
const app = express();
const port = 8000;

// we have install package call dotenv to use .env file
//it is use to hide the sensitive information like database url, password etc
//initialize the dotenv
dotenv.config()

//connect to the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDB connected")
    }).catch((err) => {
    console.log(err)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})