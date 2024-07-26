
const getTimeFrame = (period: string) => {
    const startTime = new Date();

    switch(period){
        case '1W':
            startTime.setDate(startTime.getDate() - 7);
            break;
        case '1M':
            startTime.setMonth(startTime.getMonth() - 1);
            break;
        case '3M':
            startTime.setMonth(startTime.getMonth() - 3);
            break;
        case '6M':
            startTime.setMonth(startTime.getMonth() - 6);
            break;
        case '9M':
            startTime.setMonth(startTime.getMonth() - 9);
            break;
        case '1Y':
            startTime.setFullYear(startTime.getFullYear() - 1);
            break;
        default: 
            console.error("PERIOD NOT DEFINED CORRECTLY");
            return null;
    }

    return {
        from: Math.floor(startTime.getTime() / 1000),
        to: Math.floor(Date.now() / 1000)
    };
};

export default getTimeFrame;