
import Tag from "./../models/Tags.model";
import { Request, Response } from 'express';
import HttpStatus from "http-status-codes"

interface ResponseObject {
    message: string;
    data: {};
    errors: Array<{}>;
}

const tag = new Tag();
let responseObj: ResponseObject;

export const create = async (req: Request, res: Response) => {
    console.log(req.body);
    const { name, category } = req.body

    if (name != null || category != null) {
        try {

            const result = await tag.create({
                name,
                category
            });
            console.log(result);

            responseObj = {
                message: "success",
                data: { data: result },
                errors: [{}]
            }

            res.status(HttpStatus.OK).json(responseObj);
        } catch (error) {
            console.error(error);
            responseObj = {
                message: "faild",
                data: {},
                errors: [{ errorMessage: "Some server Error" }]
            }
            res.status(HttpStatus.BAD_REQUEST).json(responseObj);
        }
    } else {

        responseObj = {
            message: "faild",
            data: {},
            errors: [{ errorMessage: "Invalid Data" }]
        }
        res.status(HttpStatus.BAD_REQUEST).json(responseObj);
    }
}

export const searchTag = async (req: Request, res: Response) => {

    const { tagName } = req.params

    if (tagName !== "") {

        try {
            const result = await tag.searchTag(tagName);

            responseObj = {
                message: "success",
                data: { data: result },
                errors: []
            }
            res.status(HttpStatus.OK).json(responseObj);
        } catch (error) {
            responseObj = {
                message: "faild",
                data: {},
                errors: [{ errorMessage: "Some server Error" }]
            }
            res.status(HttpStatus.BAD_REQUEST).json(responseObj);
        }

    } else {
        responseObj = {
            message: "faild",
            data: {},
            errors: [{ errorMessage: "Invalid Data" }]
        }
        res.status(HttpStatus.BAD_REQUEST).json(responseObj);
    }
}

export const getAllTags = async (req: Request, res: Response) => {
    try {
        const result = await tag.getAllTags();
        responseObj = {
            message: "success",
            data: { data: result },
            errors: []
        }
        res.status(HttpStatus.OK).json(responseObj);
    } catch (error) {
        responseObj = {
            message: "faild",
            data: {},
            errors: [{ errorMessage: "Some server Error" }]
        }
        res.status(HttpStatus.BAD_REQUEST).json(responseObj);
    }
}

export const getAllExcept = async (req: Request, res: Response) => {
    const { ids } = req.body as { ids: number[] }
    try {
        if (ids.every((id) => typeof id === 'number')) {
            const result = await tag.getAllExcept(ids);
            responseObj = {
                message: "success",
                data: { data: result },
                errors: []
            }
            res.status(HttpStatus.OK).json(responseObj);
        }else{
            throw new Error("Type error");
        }
       
    } catch (error) {
        responseObj = {
            message: "faild",
            data: {},
            errors: [{ errorMessage: "Some server Error" }]
        }
        res.status(HttpStatus.BAD_REQUEST).json(responseObj);
    }
}

