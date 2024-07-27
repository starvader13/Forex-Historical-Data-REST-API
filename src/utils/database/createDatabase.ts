import { Database } from "sqlite3";
import accessDatabase from "../../config/db"
import { Err } from "../../types";
import logger from "../logger";

const createDatabase = async (): Promise<boolean> => {
    const db: Database = accessDatabase();
    
    return new Promise((resolve, reject)=>{
    
        db.serialize(()=>{
            db.run(`
                CREATE TABLE IF NOT EXISTS exchange (
                    fromCurrency TEXT,
                    toCurrency TEXT,
                    date TEXT,
                    open TEXT,
                    high TEXT,
                    low TEXT,
                    close TEXT,
                    adjClose TEXT,
                    volume TEXT
                );
            `, async (err: Err)=>{
                
                if(err){
                    console.error("Failed To Create Table", err.message);
                    await logger({
                        status: false,
                        origin: "database/createDatabase",
                        logMessage: `Failed To Create Table. Error: ${err.message}`,
                        timestamp: Date()
                    });
                    return resolve(false);
                }

                console.log("Table Created Successfully\n");
                await logger({
                    status: true,
                    origin: "database/createDatabase",
                    logMessage: `Table Created Successfully`,
                    timestamp: Date()
                });
                return resolve(true);
            });
        });

        db.close();
    });
};

export default createDatabase;