import express, { Request, Response } from 'express';
import query from './../services/db';
const router = express.Router();

interface ResponseObj {
    data: {},
    message: string,
    error: [{}]
}
router.get('/', async (req: Request, res: Response) => {

    try {
        const users = await query('SELECT username,firstname,lastname FROM users;');
        const result: ResponseObj = {
            data: { data: users },
            message: "success",
            error: [{}]
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({
            data: {},
            message: "error",
            error: [{ error: error }]
        });
        console.log(error);
    }
});

export default router;