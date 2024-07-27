import { Database } from "sqlite3";
import accessDatabase from "../../config/db"
import { Err } from "../../types";

const createDatabase = (): Promise<boolean> => {
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
            `, (err: Err)=>{
                if(err){
                    console.error("Failed To Create Table", err.message);
                    return resolve(false);
                }
                console.log("Table Created Successfully\n");
                return resolve(true);
            });
        });

        db.close();
    });
};

export default createDatabase;