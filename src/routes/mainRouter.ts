import {Router, Request, Response} from "express";

const router = Router();

router.post("/forex-data", (req:Request, res: Response)=>{
    res.send("hii");
});

export default router;