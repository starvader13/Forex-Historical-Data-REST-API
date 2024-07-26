import puppeteer from 'puppeteer';
import { ScrappperResult } from '../types';

const historicalExchangeScrapper = async (fromCurrency: string, toCurrency: string, fromDate: number, toDate:number): Promise<(ScrappperResult[] | null)> => {
    const quote = fromCurrency + toCurrency + "=X";
    const encodedQuote = encodeURIComponent(quote);
    const url = `https://finance.yahoo.com/quote/${encodedQuote}/history/?period1=${fromDate}&period2=${toDate}`;
    console.log(`\nScrapping the website at ${url}\n`);

    try{
        const browser = await puppeteer.launch({headless: true});
        const page =  await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2'});

        const data = await page.evaluate(()=>{
            const rows = document.querySelectorAll('table tbody tr');
            const result: ScrappperResult[] = [];

            rows.forEach( row => {
                const columns = row.querySelectorAll('td');
                if(columns.length>0){
                    const date = columns[0].innerText;
                    const open = columns[1].innerText;
                    const high = columns[2].innerText;
                    const low = columns[3].innerText;
                    const close = columns[4].innerText;
                    const adjClose = columns[5].innerText;
                    const volume = columns[6].innerText;
                    result.push({date, open, high, low, close, adjClose, volume});
                }
            });
            
            return result;
        });

        await browser.close();
        return data;

    } catch (error: any) {
        console.error('Error fetching data:', error.message);
        return null;
    }
}

export default historicalExchangeScrapper;