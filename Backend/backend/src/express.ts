import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import zod from "zod";
import userRouter from "./userRouter.js";
import cors from "cors"
import { mongo_string } from "./mongo_string.js";

const app = express();
const port : number = 4001;

app.use(cors());
app.use(express.json());
app.use("/api/v1/user" , userRouter);

const appStartFunction = async() : Promise<any> =>{
    try{
        await mongoose.connect(mongo_string);
        app.listen(port , () : void => {
            console.log("App started and listening on port " + port);
        })
    }catch{
        console.log("Failed to start the server");
    }
}
appStartFunction();
