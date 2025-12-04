import SideBar from "../components/SideBar";
import ModalComponent from "../components/ModalComponent";
import { NavBar } from "../components/navBar";
import { useState } from "react";
import { useFetch } from "../customhook/useFetch";
import Card from "../components/Card";
export default function Dashboard(){
    const [open , setOpen] = useState(false);
    const [c , setC] = useState(0);
    const {data , loader} = useFetch(c);
    console.log(data.allContents);
    console.log(loader);
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

            {loader ? "Loading.." : <div className="grid grid-cols-4 gap-4 p-4">
                {data?.allContents?.map((obj : any , key : number) => {
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