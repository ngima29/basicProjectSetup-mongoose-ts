import { Response } from 'express';
import { HttpStatusEnum } from '../enums';

const successResponseData = ({ data, message = '', res, statusCode = HttpStatusEnum.OK }: { data?: Object | Object[] | null, message?: string, res: Response, statusCode?: HttpStatusEnum }) => {
    res.status(statusCode).json({
        success: true,
        message,
        statusCode,
        ...(data && { data })
    });
}
const errorResponse = ({ errorMessage = 'Internal Server Error', res, statusCode = HttpStatusEnum.INTERNAL_SERVER_ERROR }: { errorMessage?: any, res: Response, statusCode?: HttpStatusEnum }) => {
    res.status(statusCode).json({
        success: false,
        error: {
            message: errorMessage.message,
            statusCode,
        },
    });
}


export { successResponseData ,errorResponse}