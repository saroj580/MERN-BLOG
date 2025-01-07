import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
const app = express();
const port = 8000;

//Steps to hide the sensitive data
// we have install package call dotenv to use .env file
//it is use to hide the sensitive information like database url, password etc
//to hide the sensitive information we have to create a .env file in the root directory of the project
//and we have to add the sensitive information in the .env file
//add the .env file in the .gitignore file so that it will not be pushed to the github
//initialize the dotenv
dotenv.config()

//connect to the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDB connected")
    }).catch((err) => {
    console.log(err)
})

//Routes
// here we are using the userRoutes from the user.route.js file
//we have already created the get request in the user.route.js file so here we are using the userRoutes as use
app.use('/api/user', userRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})