import path from "path";
import { LogData } from "../types";
import fs from 'fs';

const logger = async (logData: LogData) => {
    const logDir = path.join(__dirname, '..', '..', 'logs');
    let logFile: string;

    if(logData.origin === "runScrappper.log"){
        logFile = path.join(logDir, 'runScrapper.log');
    }else{
        return null;
    }

    fs.readFile(logFile, 'utf-8', (err, data)=>{
        if(err){
            return console.log("Logs For The File Does Not Exist: ", err.message);
        }

        const writeData = data ? JSON.parse(data) : [];

        writeData.push(logData);

        fs.writeFile(logFile, writeData, (err)=>{
            if (err) throw err;
            console.log("Logger added the details")
        });
    });
}

export default logger;