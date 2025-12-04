import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config/backend_url";
import axios from "axios";

export function useFetch(c : number){
    const [data , setData] = useState([]);
    const [loader , setLoader] = useState(false);

    async function getDataFromBackend(){
        setLoader(true);
        const res = await axios.get(BACKEND_URL + "/content" , {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        setData(res.data);
        // console.log(res.data);
        setLoader(false);
    }

    useEffect(() => {
        console.log("Effect ran");
        getDataFromBackend();
    } , [c])

    return {data , loader};
}