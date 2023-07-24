import express, { Express, Request, Response, NextFunction } from 'express';

import createCommunity from "./../controllers/community.controller";
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {

        res.status(200).json(await createCommunity());
    } catch (error) {
        res.status(404).json("error occourd")
    }
})

export default router