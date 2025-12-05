import { useRef, useState } from "react"
import CrossIconSvg from "../icons/cross-svgrepo-com.svg"
import { Button } from "./button"
import { BACKEND_URL } from "../config/backend_url"
import axios from "axios"
import { refresherAtom } from "../atoms/refreshAtom";
import { useRecoilState } from "recoil"
import { startTransition } from "react"

interface InputBoxes {
    placeholder : string , 
    onChange? : () => void , 
    reference : any , 
}
interface ModalComponent {
    open : boolean , 
    onClose : () => void 
}
export default function ModalComponent(props : ModalComponent ){
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLInputElement>(null);

    const [refresher , setRefresher] = useRecoilState(refresherAtom);
    const [type , setType] = useState("");
    const [yt , setyt] = useState(false);
    const [twt , settwt] = useState(false);
    const [nt , setnt] = useState(false);

    console.log(type);

    async function addContentHandler(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const text = textRef.current?.value;

        if(title == "" || text === "" || type=== ""){
            alert("Please add a title , a text and select a type");
            return;
        }
        
        await axios.post(BACKEND_URL + "/content" , {
            title : title , 
            link : link , 
            text : text , 
            type : type
        } , {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        }).then(res => {
            console.log(res.data);
        }).then((err) => {
            console.log(err);
        })

        props.onClose();
        startTransition(() => {
            setRefresher(refresher + 1);
        })

    }
    return ( <div>
        {props.open && <div className="w-screen h-screen fixed top-0 left-0 bg-black/50 flex justify-center items-center z-1">
            <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center gap-6 ">
                <div className="w-full h-full flex justify-end">
                    <img src={CrossIconSvg} alt="" className="w-[20px] h-[20px] hover:cursor-pointer" onClick={props.onClose}/>
                </div>
                <div className="flex flex-col">
                    <InputBoxes placeholder="enter title" onChange={() => {}} reference={titleRef}></InputBoxes>
                    <InputBoxes placeholder="enter link" onChange={() => {}} reference={linkRef}></InputBoxes>
                    <InputBoxes placeholder="enter text" onChange={() => {}} reference={textRef}></InputBoxes>
                </div>
                <p>Type:-</p>
                <div className="flex gap-2">
                    
                    <Button text="Youtube" onClick={() => {
                        setyt(true);
                        settwt(false);
                        setnt(false);
                        setType("Youtube");
                    }} className= {`${yt ? "bg-indigo-500" : "bg-gray-300"} px-4 py-2 rounded text-white `}/>
                    <Button text="Twitter" onClick={() => {
                        setyt(false);
                        settwt(true);
                        setnt(false);
                        setType("Twitter");
                    }} className= {`${twt ? "bg-indigo-500" : "bg-gray-300"} px-4 py-2 rounded text-white `}/>
                    <Button text="Notes" onClick={() => {
                        setyt(false);
                        settwt(false);
                        setnt(true);
                        setType("Notes");
                    }} className= {`${nt ? "bg-indigo-500" : "bg-gray-300"} px-4 py-2 rounded text-white `}/>
                </div>
                <Button text="Create Content"  onClick={addContentHandler} className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded flex justify-between items-center gap-2 " />
            </div>
            </div>}
        </div>
    )
}

export function InputBoxes (props : InputBoxes){
    return <input ref={props.reference} type="text" placeholder={props.placeholder} className="px-4 py-2 m-2 rounded-xl" onChange={props.onChange}/>
}