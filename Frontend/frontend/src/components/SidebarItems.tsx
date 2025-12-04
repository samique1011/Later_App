

interface SideBarItems {
    title : string , 
    classNameText : string , 
    classNameSvg: string,
    icon : any , 
    onClickHandler : () => void
}

export default function SidebarItems(props : SideBarItems){
    return <button className="flex w-[40%] h-[40px] justify-between items-center hover:cursor-pointer m-4" onClick={props.onClickHandler}>
        <img src={props.icon} alt=""  className={props.classNameSvg}/>
        <p className={props.classNameText}>{props.title}</p>
    </button>
}