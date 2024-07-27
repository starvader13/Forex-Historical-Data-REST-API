import { Database } from "sqlite3";
import accessDatabase from "../config/db"
import { Err } from "../types";

const createDatabase = () => {
    const db: Database = accessDatabase();
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
                return console.error("Failed To Create Table", err.message);
            }
            return console.log("Table Created Successfully");
        });
    });
};

export default createDatabase;