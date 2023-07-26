import Community from "./../models/Community.model";
import { Request, Response } from 'express';

interface ResponseObj {
    data: {},
    message: string,
    error: [{}]
}

//Creating object
const community = new Community();

export const create = async (req: Request, res: Response) => {
    let responseObj: ResponseObj;
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
        res.status(501).json({
            message: "faild",
            data: {},
            error: [{ errorMessage: error }]
        })
    }

}

export const updateByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await community.deleteById(id);
        res.status(200).json({
            message: "success",
            data: result,
            error: {}
        })
    } catch (error) {
        res.status(501).json({
            message: "faild",
            data: {},
            error: [{ errorMessage: error }]
        })
    }
}

export const deleteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await community.deleteById(id);
        res.status(200).json({
            message: "success",
            data: result,
            error: {}
        })
    } catch (error) {
        res.status(501).json({
            message: "faild",
            data: {},
            error: [{ errorMessage: error }]
        })
        console.trace(error)
    }
}