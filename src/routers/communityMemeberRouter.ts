import express, { Request, Response } from 'express';

import { add, remove, getAllMembers } from "./../controllers/communityMemeber.controller";
const router = express.Router();

router.post('/', add)


router.get('/:id', getAllMembers)

router.delete('/:id', remove)

export default router