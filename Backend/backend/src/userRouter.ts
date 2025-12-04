import express  from "express";
import {userModel , contentModel , linkModel } from "./db.js";
import zod, { string } from "zod";
import type { Request , Response , NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const JWT_SECRET = "shine123";
import type { ObjectId } from "mongoose";
import createHashLink from "./link.js";

const userRouter = express.Router();
userRouter.use(express.json());
type NewRequest = Request & {
    userId : String
}


const userSchema = zod.object({
    username : zod.string().min(1) , 
    password : zod.string().min(4)
})

const contentPayload = zod.object({
    title : zod.string() , 
    link : zod.string() ,
    text : zod.string() , 
    type : zod.string()
})

const deletePayload = zod.object({
    contentId : zod.string()
})

type UserBody = zod.infer<typeof userSchema>;
type ContentBody = zod.infer<typeof contentPayload>
type UserDB = {
    _id : ObjectId ,
    username : string , 
    password : string
} | null


function inputValidation(req : Request , res : Response , next : NextFunction){
    const response = userSchema.safeParse(req.body);
    if(response.success)    next();
    else{
        res.status(403).json({
            msg : "Invalid format"
        })
    }
}

function contentMiddleWare(req : Request , res : Response , next : NextFunction){
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token as string, JWT_SECRET);
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }catch(e){
        res.status(403).json({
            msg : "You arent signed in yet"
        })
    }
}

function contentValidation(req : Request , res : Response , next : NextFunction){
    const response = contentPayload.safeParse(req.body);
    if(response.success)    next();
    else    res.status(403).json({
        msg : "Wrong content payload format"
    })
}
function deleteMiddleware(req : Request , res : Response , next : NextFunction){
    const { success } = deletePayload.safeParse(req.body);
    if(success) next();
    else    res.status(403).json({
        msg : "Invalid delete payload body"
    })
}

userRouter.post("/signup" , inputValidation ,  async (req : Request, res : Response) => {
    const reqBody : UserBody = req.body;
    try{
        const response : UserDB = await userModel.findOne({username : reqBody.username});
        if(!response){
            const hashedPass : string = await bcrypt.hash(reqBody.password , 3);
            await userModel.create({
                username : reqBody.username , 
                password : hashedPass
            })
            res.status(200).json({
                msg : "User successfully created"
            })
        }else{
            res.status(403).json({
                msg: "User with such username already exists , choose a unique Username"
            })
        }
    }catch{
        res.status(500).json({
            msg : "Internal server error from signup endpoint"
        })
    }
})

userRouter.post("/signin" , inputValidation , async (req : Request, res : Response) => {
    try{
        const reqBody : UserBody = req.body;

        const response : UserDB = await userModel.findOne({username : reqBody.username});
        if(response){
            const user = await bcrypt.compare(reqBody.password , response.password);
            if(user){
                console.log(response);
                const token : string = jwt.sign({
                    id : response._id ,
                    username : reqBody.username} , JWT_SECRET);
                res.status(200).json({
                    msg : "You are signed in" , 
                    token : token
                })
            }else{
                res.status(403).json({
                    msg : "Wrong password"
                })
            }
        }else{
            res.status(403).json({
                msg : "User with such username doesn't exists"
            })
        }
    }catch{
        res.status(500).json({
            msg: "Internal Server error"
        })
    }
    
})

userRouter.post("/content" , contentValidation ,  contentMiddleWare , async (req : Request , res : Response) => {
    const reqBody : ContentBody = req.body;
    //@ts-ignore
    const userId = req.userId;

    try{
        await contentModel.create({
            title : reqBody.title , 
            link : reqBody.link , 
            tags : [] , 
            userId : userId , 
            text : reqBody.text,
            type : reqBody.type
        })
        res.status(200).json({
            msg : "content created successfully"
        })
    }catch(e){
        res.status(403).json({
            msg : "content was not created"
        })
    } 
})

userRouter.get("/content" , contentMiddleWare , async (req : Request , res : Response) => {
    //@ts-ignore
    const userId = req.userId;
    const allContents = await contentModel.find({
        userId : userId
    }).populate("userId" , "username")

    res.status(200).json({
        allContents
    })
})

userRouter.delete("/content" , contentMiddleWare , deleteMiddleware , async (req : Request , res : Response) => {
    const deleteId : ObjectId = req.body.contentId;
    //@ts-ignore
    const userId = req.userId
    try{
        await contentModel.findOneAndDelete({_id : deleteId , userId  : userId}); // should not be able to delete someone else's content
        res.status(200).json({
            msg : "Content deleted"
        })
    }catch(e){
        res.status(403).json({
            msg : "Unable to delete content"
        })
    }
})

userRouter.post("/share" , contentMiddleWare , async (req : Request , res : Response) => {
    //@ts-ignore
    const userId = req.userId
    try{
        const link = await linkModel.findOne({userId : userId});
        if(link){
            res.status(200).json({
                link : link.hash
            })
        }
        else{
            let hashedLink : string = createHashLink();
            await linkModel.create({
                hash : hashedLink ,
                userId : userId  
            })
            res.status(200).json({
                link : hashedLink
            })
        }
    }catch{
        res.status(403).json({
            msg : "Internal db error"
        })
    }

})

userRouter.delete("/deleteSharableLink" , contentMiddleWare , async(req : Request , res : Response) => {
    try{
        //@ts-ignore
        let userId = req.userId;
        const link = await linkModel.findOne({userId : userId});
        if(!link){
            res.status(200).json({
                msg: "You dont have any sharable links at the moment"
            })
        }
        else{
            await linkModel.deleteOne({userId : userId});
            res.status(200).json({
                msg : "Your sharable link is now deleted"
            })
        }
    }catch{
        res.status(403).json({
            msg: "Internal DB error"
        })
    }
})

userRouter.get("/share/:shareLink" , async(req : Request , res : Response) => {
    try{
        console.log(req.params.shareLink);
        const link = await linkModel.findOne({hash : req.params.shareLink});
        if(!link){
            res.status(200).json({
                msg: "No such link exists"
            })
        }
        else{
            const userId = link.userId;
            const response = await contentModel.find({userId : userId});
            const user = await userModel.findOne({_id : userId})
            if(!user){
                return;
            }
            res.status(200).json({
                username : user.username , 
                response : response
            })
        }
    }catch{
        res.status(403).json({
            msg: "Internal DB error"
        })
    }
})

export default userRouter


