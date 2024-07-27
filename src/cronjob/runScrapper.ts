import { getTimeFrame, historicalExchangeScrapper } from "../utils";
import { createDatabase, insertDatabase } from "../utils/database";

const runScrapper = async (fromCurrency: string, toCurrency: string, period: string) => {
    const timeFrame = getTimeFrame(period);
    if (!timeFrame) {
        return console.error(`Invalid period: ${period}`);
    }

    try{
        const data = await historicalExchangeScrapper(fromCurrency, toCurrency, timeFrame.fromTime, timeFrame.toTime)
        if(!data){
            return console.log('Failed to scrape data');
        }

        const createDatabaseResponse = await createDatabase();
        if(!createDatabaseResponse){
            return console.log('Failed to create database');
        }
        
        const insertDatabaseResponse = await insertDatabase(fromCurrency, toCurrency, data);
        if(!insertDatabaseResponse){
            return console.log('Failed to insert data in database');
        }

        console.log(`Successfully scraped and inserted data for ${fromCurrency} to ${toCurrency} over the period: ${period}.`);

    }catch (err: any) {
        console.error(`Failed to scrape and insert data for ${fromCurrency} to ${toCurrency} over the period: ${period}. Error: ${err.message}`);
    }
};

export default runScrapper;