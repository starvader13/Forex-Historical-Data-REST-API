# Forex Historical Exchange Data REST API

## Introduction

This project is a REST API that scrapes historical exchange data from Yahoo Finance for specified currency pairs and periods, and stores it in an in-memory SQLite database. The data is periodically updated using a CRON job.


## Features

- **Scrape historical exchange data from Yahoo Finance.**
- **Store scraped data in an SQLite database.**
- **Periodically update data using CRON jobs.**
- **REST API endpoints to query the stored data.**
- **Swagger documentation for API endpoints.**
- **Custom Logger System**: Log messages from any location within the application and read logs directly from the CLI.


## Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [SQLite](https://www.npmjs.com/package/sqlite3)
- [TypeScript](https://www.typescriptlang.org/)
- [node-cron](https://www.npmjs.com/package/node-cron)
- [Puppeteer](https://pptr.dev/)
- [Swagger](https://swagger.io/)
- [Zod](https://zod.dev/)


## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/starvader13/Forex-Historical-Data-REST-API.git
cd Forex-Historical-Data-REST-API
```

2. **Install Dependecies:**

```bash
npm install
npm run setup
```

3. **Start Server:**

```bash
npm run build
npm start
```

## Logging System

This project includes a custom logging system that allows you to log messages from any location within the application. The logging system provides an easy way to track the status of various operations and debug issues.

### Logging Messages

To log a message, use the `logger` function. Here's an example of how to setup a logger:

```typescript
logger({
    status: false,
    origin: "database/insertDatabase",
    logMessage: `Failed To Finalize Statement. Error: ${err.message}`,
    timestamp: new Date().toISOString()
});
```

### Reading Logs

You can read and print the logs directly to the CLI by running the following command:

```bash
npm run log
```

## API Endpoints

### POST /api/forex-data

Scrape historical exchange data and store it in the database.

**Query Parameters**:

- `from` (string, required): The base currency code (e.g., GBP, AED).
- `to` (string, required): The target currency code (e.g., INR).
- `period` (string, required): The timeframe for the historical data (e.g., 1W, 1M, 3M, 6M, 1Y).

**Responses**:

- `200 OK`: Data scraped and stored successfully.
- `400 Bad Request`: Invalid input parameters.
- `500 Internal Server Error`: Failed to scrape data.


## CRON Jobs

The application also utilizes CRON jobs to periodically update the data:

### Jobs Scheduled

- **Daily Job**: 
    - Updates data for the last week (`1W` period).
    - Runs every day at IST 02:20 PM.

- **Weekly Job**: 
    - Updates data for the last month (`1M` period).
    - Runs every Saturday at IST 02:20 PM

- **Monthly Job**: 
    - Updates data for the last 3 months (`3M`), 6 months (`6M`), and 9 months (`9M`).
    - Runs every month on 1st at IST 02:20 PM

- **Yearly Job**: 
    - Updates data for the last year (`1Y`).
    - Runs on January 1st at IST 02:20 PM

### Swagger Documentation

Swagger documentation is available at `http://localhost:3000/api/docs`.

### Configuration

#### 1. Database Configuration

The SQLite database is configured in `src/config/db.ts`.

#### 2. CRON Job Configuration

The CRON jobs are configured in `src/cronjob`.

### License

This project is licensed under the MIT License.