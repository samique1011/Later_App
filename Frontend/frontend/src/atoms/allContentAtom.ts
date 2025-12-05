import { atom } from "recoil";
import { selector } from "recoil";
import { BACKEND_URL } from "../config/backend_url";
import { refresherAtom } from "./refreshAtom";
import axios from "axios";

export const allContentAtom = atom({
    key : "allContentAtom" ,
    default : {
        allContents : []
    }
})