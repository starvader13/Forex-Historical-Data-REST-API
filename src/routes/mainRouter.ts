import {Router, Request, Response} from "express";
import { validateInput, validateParameter } from "../middleware";
import { getTimeFrame, historicalExchangeScrapper } from "../utils";
import StatusCodes from "../config/StatusCodes";
import { createDatabase, insertDatabase } from "../utils/database";

const router = Router();

/**
 * @swagger
 * /forex-data:
 *   post:
 *     summary: Scrape historical exchange data from and store it in the database
 *     description: This endpoint scrapes historical exchange data from Yahoo Finance and stores it in an in-memory sqlite3 database.
 *     tags:
 *       - Forex Data
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *           example: EUR
 *         description: The currency code representing the source currency to be converted.
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *           example: USD
 *         description: The currency code representing the target currency for conversion.
 *       - in: query
 *         name: period
 *         required: true
 *         schema:
 *           type: string
 *           enum: [1W, 1M, 3M, 6M, 9M, 1Y]
 *           example: 1W
 *         description: The timeframe for the historical data
 *     responses:
 *       200:
 *         description: Data scraped and stored successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     example: "Jul 26, 2024"
 *                   open:
 *                     type: string
 *                     example: "1.0848"
 *                   high:
 *                     type: string
 *                     example: "1.0871"
 *                   low:
 *                     type: string
 *                     example: "1.0846"
 *                   close:
 *                     type: string
 *                     example: "1.0858"
 *                   adjClose:
 *                     type: string
 *                     example: "1.0858"
 *                   volume:
 *                     type: string
 *                     example: "10"
 *       400:
 *         description: Invalid input parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Invalid Period
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Failed to scrape data
 */

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