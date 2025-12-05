import { selector } from "recoil";
import { allContentAtom } from "./allContentAtom";
type Content = {
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

export const notesSelector = selector({
    key : "notesSelector" , 
    get : ({get}) => {
        const arr = get(allContentAtom);
        return arr?.allContents.filter((obj : Content) => {
            if(obj.type == "Notes") return obj;
        })
    }
})