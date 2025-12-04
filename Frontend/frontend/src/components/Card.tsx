import NotesIconSvg from "../icons/note-svgrepo-com (1).svg"
import TwitterIconSvg from "../icons/twitter-svgrepo-com.svg"
import YoutubeIconSvg from "../icons/youtube-svgrepo-com.svg"
import DeleteIconSvg from "../icons/delete-2-svgrepo-com.svg"
import { TwitterTweetEmbed } from "react-twitter-embed"
import YouTube from "react-youtube"
import { useRef } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config/backend_url"
interface CardProps {
    title : string , 
    type : "Twitter" | "Youtube" | "Notes" , 
    link : string,
    text? : string , 
    id : string , 
    onDeleteHandler : () => void
}
interface LinkProps {
    url : String ,
    text? : String
}
export default function Card(props : CardProps){
    const ref = useRef<HTMLDivElement>(null);

    async function deleteHandler(){
        const postId = ref.current?.id;
        axios.delete(BACKEND_URL + "/content" , {
            headers : {
                Authorization : localStorage.getItem("token")
            } , data : {
                contentId : postId
            }
        }).then(res => {
            props.onDeleteHandler();
        }).catch((err) => {
            alert("Error in deleting content");
        })
    }
    return <div ref={ref} id={props.id} className="bg-white  overflow-auto rounded-md shadow-md border-slate-200 border w-72 p-2 flex flex-col items-center">
        <div className="w-[95%] flex justify-between items-center pt-4 ">
            {props.type === "Twitter" && <img src={TwitterIconSvg} alt=""  className="w-[20px] h-[20px]"/>}
            {props.type === "Youtube" && <img src={YoutubeIconSvg} alt=""  className="w-[20px] h-[20px]"/>}
            {props.type === "Notes" && <img src={NotesIconSvg} alt=""  className="w-[20px] h-[20px]"/>}
            
            <p className="font-bold text-sm">{props.title}</p>
            <img src={DeleteIconSvg} alt="" onClick={deleteHandler} className="w-[20px] h-[20px] hover:cursor-pointer hover:bg-red-300" />
        </div>
        <div className="w-[90%]  pt-2 ">
            {props.type === "Twitter" && <TweetHandler url={props.link} text = {props.text}/>}
            {props.type === "Youtube" && <YoutubeHandler url={props.link} text = {props.text}/>}
            {props.type === "Notes" && <p>{props.text}</p>}
            
        </div>
    </div>
}

function TweetHandler(props : LinkProps){
    const data = props.url.split("/");
    const id = data[data.length - 1].split("?")[0];

    return <div>
        <TwitterTweetEmbed tweetId={id}/>
        <p>{props.text}</p>
    </div>
}
function YoutubeHandler(props : LinkProps){
    const data = props.url.split("=")[1];
    const opts = {
        width: "100%",
        height: "100%",
    };
    return <div className="relative w-full h-full pt-3">
        <YouTube videoId={data} opts={opts} />
        <p>{props.text}</p>
    </div>
}