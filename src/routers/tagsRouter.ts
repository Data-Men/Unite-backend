import express, { Express, Request, Response, NextFunction } from 'express';

import { create, searchTag } from "./../controllers/tag.controller";
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        await create(req, res);
    } catch (error) {
        console.log(Error);
    }
})

router.get('/:tagName', async (req: Request, res: Response) => {
    try {
        await searchTag(req, res);
    } catch (error) {
        console.log(error);
    }
})

export default router