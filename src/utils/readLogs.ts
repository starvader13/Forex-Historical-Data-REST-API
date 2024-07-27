import path from "path";
import fs from 'fs';
import { LogData } from "../types";
import readline from 'readline';

const rl = readline.createInterface(process.stdin, process.stdout);

class LogDataRenderer {
    status: boolean;
    origin: string;
    logMessage: string;
    timestamp: string

    constructor(status: boolean, origin: string, logMessage: string, timestamp: string){
        this.status = status;
        this.origin = origin;
        this.logMessage = logMessage;
        this.timestamp = timestamp;
    }
}

const readLogs = (inputFileName: string) => {
    const logDir = path.join(__dirname, '..', '..', 'logs');
    const logFile = path.join(logDir, inputFileName);

    fs.readFile(logFile, 'utf-8', (err, data)=>{
        if(err || !data){
            console.log("Logs For The File Does Not Exist");
            process.exit(1);
        }

        JSON.parse(data.trim()).map((d: LogData)=>{
            const logData = new LogDataRenderer(d.status, d.origin, d.logMessage, d.timestamp);
            console.table(logData);
        })
    })
}

rl.question('Filename: ', name => {
    readLogs(name);
    rl.close;
});

export default readLogs;