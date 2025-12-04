import { Button } from "../components/button"
import { InputBoxes } from "../components/ModalComponent"
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/backend_url";
import { useNavigate } from "react-router-dom";
export default function Signup(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signupHandler(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        axios.post(BACKEND_URL + "/signup" , {
            username : username , 
            password : password
        }).then((res) => {
            alert(res.data.msg);
            navigate("/signin");

        }).catch(err => {
            alert("User with that username already exists");
        })
    }
    return <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
        <div className="min-w-48 flex flex-col justify-center items-center gap-6 bg-white rounded p-8">
            <InputBoxes placeholder="Enter username" reference={usernameRef} />
            <InputBoxes placeholder="Enter password" reference={passwordRef} />
            <Button text="Signup" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl 
            shadow-md hover:bg-blue-700 w-[60%] transition" onClick={signupHandler}/>
        </div>
    </div>
}