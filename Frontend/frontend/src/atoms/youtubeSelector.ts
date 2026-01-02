import { selector } from "recoil";
import { allContentAtom } from "./allContentAtom";
import type { Content } from "./content";
export const youtubeSelector = selector({
    key : "youtubeSelector" , 
    get : ({get}) => {
        const arr = get(allContentAtom);
        return arr?.allContents.filter((obj : Content) => {
            if(obj.type == "Youtube") return obj;
        })
    }
})