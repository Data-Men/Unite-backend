import express, { Express, Request, Response, NextFunction } from 'express';

import { add, remove, getAllMembers } from "./../controllers/communityMemeber.controller";
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        await add(req, res);
    } catch (error) {
        console.log(Error);
    }
})


router.get('/:id', async (req: Request, res: Response) => {
    try {
        await getAllMembers(req, res);
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await remove(req, res);
    } catch (error) {
        console.log(error);
    }
})

export default router