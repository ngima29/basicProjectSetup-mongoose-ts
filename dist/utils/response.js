"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponseData = void 0;
const enums_1 = require("../enums");
const successResponseData = ({ data, metadata, message = '', res, statusCode = enums_1.HttpStatusEnum.OK }) => {
    res.status(statusCode).json({
        success: true,
        message,
        statusCode,
        ...(data && { data }),
        ...(metadata && { metadata })
    });
};
exports.successResponseData = successResponseData;
const errorResponse = ({ errorMessage = 'Internal Server Error', res, statusCode = enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR }) => {
    res.status(statusCode).json({
        success: false,
        error: {
            message: errorMessage.message,
            statusCode,
        },
    });
};
exports.errorResponse = errorResponse;
