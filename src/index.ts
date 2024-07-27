import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mainRouter from './routes/mainRouter';
import setupSwagger from './apiDocs/swagger';
import scheduleCronJobs from './cronjob/scheduleCronJobs';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api", mainRouter);

setupSwagger(app);

scheduleCronJobs();

app.listen(PORT, ()=>{
    console.log(`Server is running at Port ${PORT}`);
})

