
interface ButtonProps {
    text : string , 
    startIcon? : any , 
    onClick: () => void ,
    className : string
}
export function Button(props : ButtonProps){
    return (
    <button onClick={props.onClick} className={props.className} >
        {props.startIcon && <img src={props.startIcon} alt="" className="w-[25px] h-[25px]"/>}
        <p>{props.text}</p>
    </button>
    )
}
