"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
const mongoose_1 = require("mongoose");
/**
 * Build error response for Mongoose errors.
 */
function buildMongooseError(err) {
    // Mongoose CastError (e.g., invalid ObjectId)
    if (err instanceof mongoose_1.Error.CastError) {
        return {
            success: false,
            code: enums_1.HttpStatusEnum.BAD_REQUEST,
            message: enums_1.ReasonPhrasesEnum.BAD_REQUEST,
            details: [
                {
                    message: err.message,
                },
            ],
        };
    }
    // Mongoose Validation Error
    else if (err instanceof mongoose_1.Error.ValidationError) {
        return {
            success: false,
            code: enums_1.HttpStatusEnum.BAD_REQUEST,
            message: enums_1.ReasonPhrasesEnum.BAD_REQUEST,
            details: Object.values(err.errors).map((validationError) => {
                return {
                    message: validationError.message,
                    path: validationError.path,
                };
            }),
        };
    }
    // Return INTERNAL_SERVER_ERROR for all other cases
    else {
        return {
            success: false,
            code: enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR,
            message: enums_1.ReasonPhrasesEnum.INTERNAL_SERVER_ERROR,
        };
    }
}
exports.default = buildMongooseError;
