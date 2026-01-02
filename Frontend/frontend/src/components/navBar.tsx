import { Button } from "./button"
import plusSvgIcon from "../icons/plus-svgrepo-com.svg"
import ShareSvg from "../icons/share-svgrepo-com.svg"
interface NavbarProps {
    open : Boolean , 
    handler : () => void
}
export function NavBar(props : NavbarProps){
    return <div className="flex w-full h-[60px] justify-center items-center">
        <div className=" w-[50%] h-full flex items-center px-4 mt-4 font-bold text-2xl">
            ALL NOTES
        </div>
        <div className=" w-[50%] h-full flex justify-around">
            <Button text="Share" startIcon={ShareSvg} className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded flex justify-between items-center gap-2 h-[80%] mt-4" onClick={() => {

            }}/>
            <Button text="Create" startIcon={plusSvgIcon} className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded flex justify-between items-center gap-2 h-[80%] mt-4" onClick={props.handler}/>
        </div>
        
    </div>
}