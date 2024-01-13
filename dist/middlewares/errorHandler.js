"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericErrorHandler = exports.methodNotAllowed = exports.notFound = void 0;
const enums_1 = require("../enums");
/**
 * Error response middleware for 404 not found.
 */
function notFound(req, res) {
    res.status(enums_1.HttpStatusEnum.NOT_FOUND).json({
        success: false,
        code: enums_1.HttpStatusEnum.NOT_FOUND,
        message: enums_1.ReasonPhrasesEnum.NOT_FOUND,
    });
}
exports.notFound = notFound;
/**
 * Method not allowed error middleware.
 */
function methodNotAllowed(req, res) {
    res.status(enums_1.HttpStatusEnum.METHOD_NOT_ALLOWED).json({
        success: false,
        code: enums_1.HttpStatusEnum.METHOD_NOT_ALLOWED,
        message: enums_1.ReasonPhrasesEnum.METHOD_NOT_ALLOWED,
    });
}
exports.methodNotAllowed = methodNotAllowed;
/**
 * Generic error response middleware for validation and internal server errors.
 */
function genericErrorHandler(err, req, res, next) {
    const buildError = (error) => {
        if (error.isJoi) {
            return {
                success: false,
                code: enums_1.HttpStatusEnum.BAD_REQUEST,
                message: enums_1.ReasonPhrasesEnum.BAD_REQUEST,
                details: (error.details || []).map((err) => ({
                    message: err.message,
                    param: err.path.join('.'),
                })),
            };
        }
        else {
            return {
                success: false,
                code: enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR,
                message: enums_1.ReasonPhrasesEnum.INTERNAL_SERVER_ERROR,
            };
        }
    };
    const error = buildError(err);
    res.status(error.code).json({ ...error });
}
exports.genericErrorHandler = genericErrorHandler;
