import SideBar from "../components/SideBar";
import ModalComponent from "../components/ModalComponent";
import { NavBar } from "../components/navBar";
import { useState } from "react";
import { useFetch } from "../customhook/useFetch";
import Card from "../components/Card";
import { allContentAtom } from "../atoms/allContentAtom";
import { useRecoilState, useRecoilStateLoadable, useRecoilValueLoadable } from "recoil";
export default function Dashboard(){
    const [open , setOpen] = useState(false);
    const [c , setC] = useState(0);
    const allContent = useRecoilValueLoadable(allContentAtom);
    const setAllContent = useRecoilState(allContentAtom);
    console.log("------");
    console.log(allContent);
    return <>
            <SideBar/>
            <div className='ml-72 bg-gray-100 min-h-screen'>
            <ModalComponent open={open} onClose={() => {
                setOpen((open) => !open);
            }} onIncrement = {() => {
                setC(c => c + 1);
            }}  />
            <NavBar open = {open} handler = {() => {
                setOpen(true);
            }}></NavBar>

            {allContent.state === "loading" ? "Loading.." : <div className="grid grid-cols-4 gap-4 p-4">
                {allContent?.contents.allContents?.map((obj : any , key : number) => {
                    console.log(obj._id);
                    return <Card id={obj._id} key={key} type={obj.type} link={obj.link} text={obj.text} title={obj.title}
                    onDeleteHandler = {() => {
                        setC(c => c - 1);
                    }} />
                })}
            </div> }
              
            </div> 
        </>
}