export type Content = {
    _id : string , 
    link : String , 
    tags : Array<any> , 
    text : string,
    title : string , 
    type : string ,
    userId : {
        _id : string,
        username : string
    }
}