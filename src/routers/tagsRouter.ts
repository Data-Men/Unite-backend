import express, { Request, Response } from 'express';

import { create, searchTag, getAllTags, getAllExcept } from "./../controllers/tag.controller";
const router = express.Router();

router.post('/', create)

router.get('/', getAllTags)

router.get('/exclude', getAllExcept)

router.get('/:tagName', searchTag)


export default router