import express, { Express, Request, Response, NextFunction } from 'express';

import { create,update } from "./../controllers/community.controller";
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    await create(req, res);
})

router.put('/:id', async (req: Request, res: Response) => {
    try {
        res.status(200).json({})
    } catch (error) {
        res.status(501).json("")
    }
})


export default router