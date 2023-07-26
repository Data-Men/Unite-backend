import CommunityMembers from "./../models/CommunityMembers.model";
import { Request, Response } from 'express';
import HttpStatus from "http-status-codes";
import { stringify } from "querystring";

interface ResponseObject {
    message: string;
    data: {};
    errors: Array<{}>;
}

const communityMembers = new CommunityMembers();
let responseObj: ResponseObject;

export const add = async (req: Request, res: Response) => {
    console.log(req.body);
    const { communityId, userId, username, fullName, profileImg } = req.body

    if (communityId != null || userId != null || username != null || fullName != null) {
        try {

            const result = await communityMembers.add({
                community_id: communityId,
                user_id: userId,
                username: username,
                member_name: fullName,
                memeber_pic: profileImg
            });

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

export const remove = async (req: Request, res: Response) => {

    const { id } = req.params
    if (id !== "") {

        try {
            const result = await communityMembers.remove(id);
            console.log(result);

            responseObj = {
                message: "sucess",
                data: {},
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

export const getAllMembers = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (id !== "") {

        try {
            const result = await communityMembers.getAllMembers(id);
            console.log(result);

            responseObj = {
                message: "sucess",
                data: { data: result },
                errors: []
            }
            res.status(HttpStatus.OK).json(responseObj);
        } catch (error) {
            responseObj = {
                message: "faild",
                data: {},
                errors: [{ errorMessage: "Invalid Data" }]
            }
            res.status(HttpStatus.BAD_REQUEST).json(responseObj);
        }

    }
}