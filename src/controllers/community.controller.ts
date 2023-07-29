import Community from "./../models/Community.model";
import { Request, Response } from 'express';
import HttpStatus from "http-status-codes"

interface ResponseObject {
    message: string;
    data: {};
    errors: Array<{}>;
}

//Creating object
const community = new Community();
let responseObject: ResponseObject;
export const create = async (req: Request, res: Response) => {
    try {
        const { communityData, memberData, tagIds } = req.body
        const { name, description, bannerImg, profilePic, createdBy, privacyStatus } = communityData;
        const { userId, username, memberName, memberPic } = memberData

        const result = await community.create({
            name,
            description,
            banner_image: bannerImg,
            profile_pic: profilePic,
            created_by: createdBy,
            privacy_status: privacyStatus,
        }, {
            user_id: userId,
            username,
            member_name: memberName,
            member_pic: memberPic,
        }, tagIds)
        responseObject = {
            message: "success",
            data: { data: result },
            errors: [{}]
        }
        res.status(HttpStatus.OK).json(responseObject);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "faild",
            data: {},
            errors: [{ errorMessage: "some server error." }]
        })
    }

}

export const updateByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await community.deleteById(id);
        responseObject = {
            message: "success",
            data: { data: result },
            errors: [{}]
        }
        res.status(HttpStatus.OK).json(responseObject);
    } catch (error) {
        res.status(501).json({
            message: "faild",
            data: {},
            error: [{ errorMessage: error }]
        })
    }
}

export const getByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        if (name != "") {
            const result = await community.getByName(name);

            responseObject = {
                message: "success",
                data: { data: result },
                errors: [{}]
            }
            res.status(200).json(responseObject)
        } else {
            res.status(200).json({
                message: "success",
                data: { data: {} },
                error: [{}]
            })
        }
    } catch (error) {
        res.status(501).json({
            message: "faild",
            data: {},
            error: [{ errorMessage: error }]
        })
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (id != "") {
            const result = await community.getById(id);
            res.status(200).json({
                message: "success",
                data: { data: result },
                error: [{}]
            })
        } else {
            res.status(200).json({
                message: "success",
                data: { data: {} },
                error: [{}]
            })
        }
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