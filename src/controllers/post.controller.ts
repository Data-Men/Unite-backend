
import exp from "constants";
import Post from "./../models/CommunityPost.model";
import { Request, Response } from 'express';
import HttpStatus from "http-status-codes"

interface ResponseObject {
    message: string;
    data: {};
    errors: Array<{}>;
}

const post = new Post();
let responseObj: ResponseObject;

export const createPost = async (req: Request, res: Response) => {
    // console.log(req.body);
    const { caption, media, tags, community_id, member_id } = req.body

    if (community_id != null && member_id != null) {
        try {
            const result = await post.createPost({
                caption, media, tags, community_id, member_id
            })
            // console.log(result);

            responseObj = {
                message: "success",
                data: { data: result },
                errors: [{}]
            }
            res.status(HttpStatus.OK).json(responseObj);
        } catch (error) {
            // console.error(error);
            responseObj = {
                message: "faild",
                data: {},
                errors: [{ errorMessage: "Some server Error" }]
            }
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseObj);
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

export const deletePost = async (req: Request, res: Response) => {

    const { postId } = req.params
    if (typeof postId == "string" && postId != "") {
        try {
            const result = await post.deletePost(postId);

            if (result) {

                responseObj = {
                    message: "success",
                    data: {},
                    errors: [{}]
                }
                res.status(HttpStatus.OK).json(responseObj);
            } else {
                responseObj = {
                    message: "faild",
                    data: {},
                    errors: [{ errorMessage: "Post Does Not Exist" }]
                }
                res.status(HttpStatus.NOT_FOUND).json(responseObj);
            }
        } catch (error) {
           // console.error(error);
            responseObj = {
                message: "faild",
                data: {},
                errors: [{ errorMessage: "Some server Error" }]
            }
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseObj);
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

export const getPostById = async (req: Request, res: Response) => {
    const { postId } = req.params

    if (typeof postId == "string" && postId != "") {
        try {
            const result = await post.getById(postId);

            if (result) {
                responseObj = {
                    message: "success",
                    data: { data: result },
                    errors: [{}]
                }
                res.status(HttpStatus.OK).json(responseObj);
            } else {
                responseObj = {
                    message: "faild",
                    data: {},
                    errors: [{ errorMessage: "No Such Post Exists" }]
                }
                res.status(HttpStatus.NOT_FOUND).json(responseObj);
            }
        } catch (error) {
            console.error(error);
            responseObj = {
                message: "faild",
                data: {},
                errors: [{ errorMessage: "Some server Error" }]
            }
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseObj);
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