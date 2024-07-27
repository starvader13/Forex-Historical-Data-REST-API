import { NextFunction, Request, Response } from "express";
import StatusCodes from "../config/StatusCodes";
import zod from 'zod';

const validateInputSchema = zod.object({
    from: zod.string().max(50, { message: "'from' should not exceed 50 characters" }).min(1, { message: "'from' should have at least 1 character" }),
    to: zod.string().max(50, { message: "'to' should not exceed 50 characters" }).min(1, { message: "'to' should have at least 1 character" }),
    period: zod.enum(['1W', '1M', '3M', '6M', '9M', '1Y'], {
        errorMap: () => ({ message: "'period' should be one of '1W', '1M', '3M', '6M', '9M', '1Y'" })
    })
}).strict();

const validateInput = (req: Request, res: Response, next: NextFunction) => {
    const {from, to, period} = req.query;
    const zodResponse = validateInputSchema.safeParse({from, to, period});

    if(!zodResponse.success){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: zodResponse.error.issues[0].message
        })
    }

    return next();
}

export default validateInput;