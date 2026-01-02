import { atom } from "recoil";
import type { Content } from "./content";
type allContentAtomProps = {
    allContents : Content[]
}
export const allContentAtom = atom<allContentAtomProps>({
    key : "allContentAtom" ,
    default : {
        allContents : []
    }
})