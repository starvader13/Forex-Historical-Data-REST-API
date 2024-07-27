import path from "path";
import { LogData } from "../types";
import fs from 'fs';

const logger = async (logData: LogData) => {
    const logDir = path.join(__dirname, '..', '..', 'logs');
    let logFile: string;

    if(logData.origin.includes("runScrappper")){
        logFile = path.join(logDir, 'runScrapper.log');
    }else if(logData.origin.includes("database")){
        logFile = path.join(logDir, 'database.log');
    }else{
        return null;
    }

    fs.readFile(logFile, 'utf-8', (err, data)=>{
        if(err){
            return console.log("Logs For The File Does Not Exist: ", err.message);
        }

        const writeData = data ? JSON.parse(data) : [];

        writeData.push(logData);

        fs.writeFile(logFile, JSON.stringify(writeData), (err)=>{
            if (err) throw err;
            console.log("Logger added the details\n")
        });
    });
}

export default logger;