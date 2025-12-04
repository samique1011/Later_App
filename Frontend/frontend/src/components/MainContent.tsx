import { NavBar } from "./navBar";
import ShowCardsComponent from "./ShowCardsComponent";

export default function MainContent(){
    return <div className="flex flex-col w-full">
        <NavBar/>
        <ShowCardsComponent/>
    </div>
    
}