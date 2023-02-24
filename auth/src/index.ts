import express from "express";
import 'express-async-errors';
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signinRoute } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import {errrorHandler} from "./middlewares/error-handler"
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(express.json());


app.use(currentUserRouter);
app.use(signinRoute);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', (req, res, next) =>{
    next (new NotFoundError());
});

app.use(errrorHandler);

const start = async() => {
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',{});
        console.log('Connected to MongoDb')
    } catch(err){
        console.error(err);
    }
    app.listen(3000,()=>{
        console.log('Listening on port 3000!');
    });
};


start();