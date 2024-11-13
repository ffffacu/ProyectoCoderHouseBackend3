import dotenv from "dotenv";
import {program} from "./commander.js";

const setPath = (mode) =>{
    switch (mode){
        case "production":
            return ".env.production";
        case "development":
            return ".env.development";
        default:
                return ".env.development"; 
    }
}

dotenv.config({path: setPath(program.opts().m)});

export default{
    PORT:process.env.PORT,
    MONGOURL:process.env.MONGOURL
}