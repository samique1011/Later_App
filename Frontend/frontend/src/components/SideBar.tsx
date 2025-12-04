
import LaterAppSVG from "../icons/note-svgrepo-com.svg"
import NotesSVG from "../icons/note-svgrepo-com (1).svg"
import YoutubeSVG from "../icons/youtube-svgrepo-com.svg";
import TwitterSVG from "../icons/twitter-svgrepo-com.svg"
import SidebarItems from "./SidebarItems";


export default function SideBar(){

    return <div className="flex flex-col w-72 h-full border-r-2 border-gray-200 fixed">
        <div className="flex justify-around items-center m-6  w-[80%]">
            <img src={LaterAppSVG} alt="" className="w-[20px] h-[20px]" />
            <p className="font-bold text-2xl">Later-App</p>
        </div>
        <div className="flex flex-col  h-full items-center">
            <SidebarItems title="Notes" classNameText="font-bold " classNameSvg="w-[20px] h-[20px]" onClickHandler={() => {

            }} icon={NotesSVG}/>
            <SidebarItems title="Youtube" classNameText="font-bold " classNameSvg="w-[20px] h-[20px]" onClickHandler={() => {

            }} icon={YoutubeSVG}/>
            <SidebarItems title="Twitter" classNameText="font-bold " classNameSvg="w-[20px] h-[20px]" onClickHandler={() => {

            }} icon={TwitterSVG}/>
        </div>
        
        
    </div>
}