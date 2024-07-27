import { Database } from "sqlite3";
import { Err, ScrappperResult } from "../../types";
import accessDatabase from "../../config/db";
import logger from "../logger";

const insertDatabase = (fromCurrency: string, toCurrency: string, scrappedData: ScrappperResult[]): Promise<boolean> => {
    const db: Database = accessDatabase();

    return new Promise((resolve, reject)=>{
        
        const query = db.prepare(`
            INSERT INTO exchange (fromCurrency, toCurrency, date, open, high, low, close, adjClose, volume) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `);

        db.run("BEGIN TRANSACTION");
    
        scrappedData.forEach((data)=>{
            query.run(fromCurrency, toCurrency, data.date, data.open, data.high, data.low, data.close, data.adjClose, data.volume, (err: Err)=>{
                if(err){
                    console.error("Failed To Insert In Table", err.message);
                    return resolve(false);
                }
            }); 
        });
    
        query.finalize(async (err)=>{
            if(err){
                console.error("Failed To Finalize Statement", err.message);
                db.run("ROLLBACK");
                
                await logger({
                    status: false,
                    origin: "database/insertDatabase",
                    logMessage: `Failed To Finalize Statement. Error: ${err.message}`,
                    timestamp: Date()
                });
                return resolve(false);
            }

            console.log("Data Inserted Successfully");
            db.run("COMMIT");
            
            await logger({
                status: true,
                origin: "database/insertDatabase",
                logMessage: `Data Inserted Successfully`,
                timestamp: Date()
            });
            return resolve(true);
        });

        db.close();
    });
};

export default insertDatabase;