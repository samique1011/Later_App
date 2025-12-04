export default function createHashLink() : string {
    const options : string = "snokfkrnofoyuiaewhfaowieufdaondcjashv9840293841213";
    let linkFormed : string = "";
    for(let x : number = 1; x <= 15; x += 1){
        linkFormed += options[Math.floor(Math.random() * options.length)];
    }
    return linkFormed;
}

