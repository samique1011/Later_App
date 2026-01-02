import { selector } from "recoil";
import { allContentAtom } from "./allContentAtom";
import type { Content } from "./content";

export const notesSelector = selector({
    key : "notesSelector" , 
    get : ({get}) => {
        const arr = get(allContentAtom);
        return arr?.allContents.filter((obj : Content) => {
            if(obj.type == "Notes") return obj;
        })
    }
})