import cron from 'node-cron';
import { CURRENCY_PAIRS, PERIOD } from './cronSchedulerData';
import runScrapper from './runScrapper';

const scheduleCronJobs = async () => {

    // Runs every day at IST 02:20 PM.
    cron.schedule('20 14 * * *', ()=>{
        CURRENCY_PAIRS.forEach(pair => {
            runScrapper(pair.fromCurrency, pair.toCurrency, PERIOD.ONE_WEEK);
        });
    });

    // Runs every Saturday at IST 02:20 PM.
    cron.schedule('20 14 * * 6', ()=>{
        CURRENCY_PAIRS.forEach(pair => {
            runScrapper(pair.fromCurrency, pair.toCurrency, PERIOD.ONE_MONTH);
        });
    });

    // Runs every month on 1st at IST 02:20 PM.
    cron.schedule('20 14 1 * *', ()=>{
        CURRENCY_PAIRS.forEach(pair => {
            [PERIOD.THREE_MONTHS, PERIOD.SIX_MONTHS, PERIOD.NINE_MONTHS].forEach(period=>{
                runScrapper(pair.fromCurrency, pair.toCurrency, period);
            })
        });
    });

    // Runs on January 1st at IST 02:20 PM.
    cron.schedule('20 14 1 1 *', ()=>{
        CURRENCY_PAIRS.forEach(pair => {
            runScrapper(pair.fromCurrency, pair.toCurrency, PERIOD.ONE_YEAR);
        });
    });
};

export default scheduleCronJobs;