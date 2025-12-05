import { atom } from "recoil";
export const allAtom= atom({
    key : "allAtom" , 
    default : true
})

export const notesAtom = atom({
    key : "noteAtom" , 
    default : false
})

export const twitterAtom= atom({
    key : "twitterAtom" , 
    default : false
})

export const youtubeAtom = atom({
    key : "youtubeAtom" , 
    default : false
})