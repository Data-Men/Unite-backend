import express, { Express, Request, Response, NextFunction } from 'express';

import { create, updateByID, deleteById } from "./../controllers/community.controller";
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    await create(req, res);
  } catch (error) {
    console.log(error);
  }
})

router.put('/:id', async (req: Request, res: Response) => {
    try {
        await updateByID(req, res);
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await deleteById(req, res);
    } catch (error) {
        console.log(error);
    }
})


export default router