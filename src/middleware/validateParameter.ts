import { NextFunction, Request, Response } from "express"

const validateParameter = (req: Request, res: Response, next: NextFunction) => {
    const queryParameter = req.query;

    console.log(queryParameter);
    return next();
}

export default validateParameter;