import mongoose, { mongo } from "mongoose";
import type { ObjectId } from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : String ,
    password : String
})

const contentSchema = new Schema({
    title : String , 
    link : String , 
    tags : [{type : mongoose.Types.ObjectId , ref : 'Tag'}] , 
    userId : {type : mongoose.Types.ObjectId , ref : 'Users'} ,
    text : String ,
    type : String
})

const LinkSchema = new Schema({
    hash : String , 
    userId : {type : mongoose.Types.ObjectId , ref : 'Users'}
})

const tagSchema = new Schema({
    name: String 
})

const contentModel = mongoose.model('content' , contentSchema);
const linkModel = mongoose.model('links' , LinkSchema)
const userModel = mongoose.model('Users' , userSchema);
const tagModel = mongoose.model('Tag' , tagSchema);

export {userModel , contentModel , linkModel}