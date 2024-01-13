"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalError = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        status: 'error',
        message: error.message,
    });
    res.status(500).json({
        success: false,
        code: 500,
        message: 'Internal Server Error',
        details: error.message,
    });
};
exports.default = globalError;
