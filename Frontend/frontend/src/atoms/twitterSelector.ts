import { selector } from "recoil";
import { allContentAtom } from "./allContentAtom";
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
export const twitterSelector = selector({
    key : "twitterSelector" , 
    get : ({get}) => {
        const arr = get(allContentAtom);
        return arr?.allContents.filter((obj : Content) => {
            if(obj.type == "Twitter") return obj;
        })
    }
})