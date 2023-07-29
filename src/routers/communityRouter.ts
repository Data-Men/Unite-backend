import express, { Express, Request, Response, NextFunction, response } from 'express';

import { create, getByName, getById, updateByID, deleteById } from "./../controllers/community.controller";
import { request } from 'http';
const router = express.Router();

router.post('/', create)

router.get('/search/:name', getByName)

router.get('/:id', getById)

router.put('/:id', updateByID)

router.delete('/:id', deleteById)


export default router