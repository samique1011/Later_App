import { selector } from "recoil";
import { allContentAtom } from "./allContentAtom";
import type { Content } from "./content";
export const twitterSelector = selector({
    key : "twitterSelector" , 
    get : ({get}) => {
        const arr = get(allContentAtom);
        return arr?.allContents.filter((obj : Content) => {
            if(obj.type == "Twitter") return obj;
        })
    }
})