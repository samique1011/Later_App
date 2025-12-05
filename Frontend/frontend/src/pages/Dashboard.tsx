import SideBar from "../components/SideBar";
import ModalComponent from "../components/ModalComponent";
import { NavBar } from "../components/navBar";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { allContentAtom } from "../atoms/allContentAtom";
import { useRecoilState, useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable , useSetRecoilState } from "recoil";
import { refresherAtom } from "../atoms/refreshAtom";
import { BACKEND_URL } from "../config/backend_url";
import axios from "axios";
import { notesSelector } from "../atoms/notesSelector";
import { twitterSelector } from "../atoms/twitterSelector";
import { youtubeSelector } from "../atoms/youtubeSelector";
import { allAtom , youtubeAtom , twitterAtom , notesAtom } from "../atoms/switcherAtoms";

export default function Dashboard(){
    const [open , setOpen] = useState(false);
    const [refresher , setRefresher] = useRecoilState(refresherAtom);
    const allContent = useRecoilValueLoadable(allContentAtom);
    const setAllContent = useSetRecoilState(allContentAtom);
    const notesContent = useRecoilValue(notesSelector);
    const youtubeContent = useRecoilValue(youtubeSelector);
    const twitterContent = useRecoilValue(twitterSelector);

    //implement switcher atoms and sidebar Functionality
    const [allAtomSwitch , setAllAtomSwitch] = useRecoilState(allAtom);
    const [youtubeSwitch , setYoutubeSwitch] = useRecoilState(youtubeAtom);
    const [twitterSwitch , setTwitterSwitch] = useRecoilState(twitterAtom);
    const [notesSwitch , setNotesSwitch] = useRecoilState(notesAtom);
    console.log(notesContent);
    console.log(youtubeContent);
    console.log(twitterContent);
    console.log("------");
    console.log(allContent);

    async function getDataFromBackend(){
        const res : any = await axios.get(BACKEND_URL + "/content" , {
            headers : {
                Authorization : localStorage.getItem("token")
            }  
        })
        setAllContent(res.data);
    }

    useEffect(() => {
        getDataFromBackend();
    } , [refresher]);
    return <>
            <SideBar/>
            <div className='ml-72 bg-gray-100 min-h-screen'>
            <ModalComponent open={open} onClose={() => {
                setOpen((open) => !open);
            }}/>
            <NavBar open = {open} handler = {() => {
                setOpen(true);
            }}></NavBar>

            {allContent.state === "loading" ? "Loading.." : <div className="grid grid-cols-4 gap-4 p-4">
                {allContent?.contents.allContents?.map((obj : any , key : number) => {
                    console.log(obj._id);
                    return <Card id={obj._id} key={key} type={obj.type} link={obj.link} text={obj.text} title={obj.title}
                    onDeleteHandler = {() => {
                       setRefresher(refresher - 1);
                    }} />
                })}
            </div> }
              
            </div> 
        </>
}

function ShowData(){

}