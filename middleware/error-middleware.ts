import {Request, Response} from "express";
import HttpException from "../common/http-exception";


export default (
    error: HttpException,
    req: Request,
    res: Response
) => {
    const status = error.statusCode || error.status || 500
    res.status(status).send(error)
}