import { error } from "console";
import Community from "./../models/Community.model";
import { Request, Response } from 'express';

const community = new Community();

export const create = async (req: Request, res: Response) => {

    try {
        const { name, description, created_by, privacy_status } = req.body
        const result = await community.create({
            name,
            created_by,
            description,
            privacy_status,
        })
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json("error occourd")
    }

}

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, description, created_by, privacy_status } = req.body
        const result = await community.updateByID(id, {
            name,
            description,
            created_by,
            privacy_status
        });
        res.status(200).json({
            message: "success",
            data: result,
            error: {}
        })
    } catch (error) {
        console.trace(error)
    }
}