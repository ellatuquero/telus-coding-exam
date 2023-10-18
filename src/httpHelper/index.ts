// TODO: Helpers for response handling functions
import { Response } from 'express'

/**
 *
 *
 * @export
 * @param {Response} res
 * @param {{
 *     statusCode ?: number;
 *     message ?: string;
 *     jsonResponse ?: object;
 * }} { statusCode = 200, message = 'ok', jsonResponse }
 * @return {Response}  {Response}
 */
export function successResponse (res: Response, { statusCode = 200, message = 'ok', jsonResponse } : {
    statusCode ?: number;
    message ?: string;
    jsonResponse ?: object;
}) : Response
{
    return res.status(statusCode)
        .send({
            success : true,
            message : message ? message : 'ok',
            data : jsonResponse ? { ...jsonResponse } : undefined
        })
}

export function upperCasePerWord(value : string) {
    return value.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}