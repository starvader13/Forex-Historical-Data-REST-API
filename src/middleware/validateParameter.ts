import { NextFunction, Request, Response } from "express";
import StatusCodes from "../config/StatusCodes";

const validateParameter = (req: Request, res: Response, next: NextFunction) => {
    const queryParameter = req.query;

    if(!queryParameter.from || !queryParameter.to || !queryParameter.period){
        return res.status(StatusCodes.FORBIDDEN).json({
            msg: "The query parameter does not contains required information"
        })
    }

    return next();
}

export default validateParameter;