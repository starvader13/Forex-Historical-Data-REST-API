import { Database, RunResult } from "sqlite3";
import { Err, ScrappperResult } from "../../types";
import accessDatabase from "../../config/db";

const insertDatabase = (fromCurrency: string, toCurrency: string, scrappedData: ScrappperResult[]) => {
    const db: Database = accessDatabase();
    
    const query = db.prepare(`
        INSERT INTO exchnage (fromCurrency, toCurrency, date, open, high, low, close, adjClose, volume) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `);

    scrappedData.forEach((data)=>{
        query.run(fromCurrency, toCurrency, data.date, data.open, data.high, data.low, data.close, data.adjClose, data.volume, (err: Err, result: RunResult)=>{
            if(err){
                return console.error("Failed To Insert In Table", err.message);
            }
            return console.log(`${result.changes} rows got affected`);
        }); 
    });

    query.finalize((err)=>{
        if(err){
            return console.error("Failed To Finalize Statement", err.message);
        }
        return console.log("Data Inserted Successfully");
    })
};

export default insertDatabase;