import express from 'express';

import { createPost, deletePost, getPostById } from './../controllers/post.controller';

const router = express.Router();

router.post('/', createPost);

//to get individual post by its id
router.get(`/:postId`, getPostById);

router.delete('/:postId', deletePost);

export default router