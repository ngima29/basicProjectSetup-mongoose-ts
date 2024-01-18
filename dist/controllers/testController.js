"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
class TestController {
    constructor() { }
    static async create(req, res) {
        const data = req.body;
        try {
            const result = await new services_1.TestService().create(data);
            return (0, utils_1.successResponseData)({ data: result, message: "Test data is created.", res });
        }
        catch (error) {
            console.error("Error creating test:", error.message);
            return (0, utils_1.errorResponse)({ errorMessage: error, res, statusCode: 400 });
        }
    }
    ;
    static async getMyQR(req, res) {
        try {
            const data = await new services_1.TestService().getMyQR();
            if (data) {
                return (0, utils_1.successResponseData)({ data, message: "test data found.", res });
            }
        }
        catch (error) {
            console.error("Error getting test QR:", error.message);
            return (0, utils_1.errorResponse)({ errorMessage: error, res, statusCode: 404 });
        }
    }
}
exports.TestController = TestController;
