import sqlite3 from "sqlite3";

const accessDatabase = () => {
    const db = new sqlite3.Database('./exchangeDatabase.db', (err)=>{
        if(err){
            console.error("Failed To Connect Database", err.message);
            process.exit(1);
        }
        return console.log("Database Connected Successfully");
    });

    return db;
};

export default accessDatabase;