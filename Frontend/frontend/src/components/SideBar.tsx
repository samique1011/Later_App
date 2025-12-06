import { useRecoilState } from "recoil";
import LaterAppSVG from "../icons/note-svgrepo-com.svg"
import NotesSVG from "../icons/note-svgrepo-com (1).svg"
import YoutubeSVG from "../icons/youtube-svgrepo-com.svg";
import TwitterSVG from "../icons/twitter-svgrepo-com.svg"
import SidebarItems from "./SidebarItems";
import { allAtom , youtubeAtom , twitterAtom , notesAtom } from "../atoms/switcherAtoms";

export default function SideBar(){

    const [allAtomSwitch , setAllAtomSwitch] = useRecoilState(allAtom);
    const [youtubeSwitch , setYoutubeSwitch] = useRecoilState(youtubeAtom);
    const [twitterSwitch , setTwitterSwitch] = useRecoilState(twitterAtom);
    const [notesSwitch , setNotesSwitch] = useRecoilState(notesAtom);

    return <div className="flex flex-col w-72 h-full border-r-2 border-gray-200 fixed">
        <div className="flex justify-around items-center m-6  w-[80%]">
            <img src={LaterAppSVG} alt="" className="w-[20px] h-[20px]" />
            <p className="font-bold text-2xl">Later-App</p>
        </div>
        <div className="flex flex-col  h-full items-center">
            <SidebarItems title = "All" classNameText="font-bold" onClickHandler={() => {
                setAllAtomSwitch(true);
                setYoutubeSwitch(false);
                setTwitterSwitch(false);
                setNotesSwitch(false);
            }} />
            <SidebarItems title="Notes" classNameText="font-bold " classNameSvg="w-[20px] h-[20px]" onClickHandler={() => {
                setAllAtomSwitch(false);
                setYoutubeSwitch(false);
                setTwitterSwitch(false);
                setNotesSwitch(true);
            }} icon={NotesSVG}/>
            <SidebarItems title="Youtube" classNameText="font-bold " classNameSvg="w-[20px] h-[20px]" onClickHandler={() => {
                setAllAtomSwitch(false);
                setYoutubeSwitch(true);
                setTwitterSwitch(false);
                setNotesSwitch(false);
            }} icon={YoutubeSVG}/>
            <SidebarItems title="Twitter" classNameText="font-bold " classNameSvg="w-[20px] h-[20px]" onClickHandler={() => {
                setAllAtomSwitch(false);
                setYoutubeSwitch(false);
                setTwitterSwitch(true);
                setNotesSwitch(false);
            }} icon={TwitterSVG}/>
        </div>
        
        
    </div>
}