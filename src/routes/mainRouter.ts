import {Router, Request, Response} from "express";
import { validateInput, validateParameter } from "../middleware";
import { getTimeFrame, historicalExchangeScrapper } from "../utils";
import StatusCodes from "../config/StatusCodes";
import { createDatabase, insertDatabase } from "../utils/database";

const router = Router();

router.post("/forex-data", validateParameter, validateInput, async (req: Request, res: Response)=>{
    const fromCurrency = <string>req.query.from;
    const toCurrency = <string>req.query.to;
    const period = <string>req.query.period;

    const timeFrame = getTimeFrame(period);
    if (!timeFrame) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg: "Invalid Period"
        });
    }

    try{
        const data = await historicalExchangeScrapper(fromCurrency, toCurrency, timeFrame.fromTime, timeFrame.toTime)
        if(!data){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
                msg: 'Failed to scrape data' 
            });
        }

        const createDatabaseResponse = await createDatabase();
        if(!createDatabaseResponse){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
                msg: 'Failed to create database' 
            });
        }
        
        const insertDatabaseResponse = await insertDatabase(fromCurrency, toCurrency, data);
        if(!insertDatabaseResponse){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
                msg: 'Failed to insert data in database' 
            });
        }

        return res.status(StatusCodes.OK).json(data);
    }catch(err: any){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        });
    };
});

export default router;