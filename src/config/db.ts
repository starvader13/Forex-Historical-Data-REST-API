import sqlite3 from "sqlite3";

const accessDatabase = () => {
    const db = new sqlite3.Database('./exchangeDatabase.db', (err)=>{
        if(err){
            return console.error("Failed To Connect Database", err.message);
        }
        return console.log("Database Connected Successfully");
    });

    return db;
};

export default accessDatabase;