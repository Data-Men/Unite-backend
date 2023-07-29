import express, { Request, Response } from 'express';

import { create, searchTag, getAllTags } from "./../controllers/tag.controller";
const router = express.Router();

router.post('/', create)

router.get('/', getAllTags)

router.get('/:tagName', searchTag)

export default router