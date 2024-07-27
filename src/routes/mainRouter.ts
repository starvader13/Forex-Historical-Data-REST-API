import {Router, Request, Response} from "express";
import validateParameter from "../middleware/validateParameter";

const router = Router();

router.post("/forex-data", validateParameter, (req: Request, res: Response)=>{
    res.send("hii");
});

export default router;