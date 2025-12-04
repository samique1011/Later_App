import { atom } from "recoil";
import { selector } from "recoil";
import { BACKEND_URL } from "../config/backend_url";
import axios from "axios";

export const allContentAtom = atom({
    key : "allContentAtom" ,
    default : selector({
        key : "allCon" ,
        get : async function(): Promise<any> {
            const res : any = await axios.get(BACKEND_URL + "/content" , {
            headers : {
                Authorization : localStorage.getItem("token")
            }  
            })
            return res.data;
        }
    })
})