"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
const config_1 = require("../config");
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
    static async findAll(req, res) {
        let { limit, sort, order, query, page } = req.query;
        sort = sort || config_1.defaultSort;
        query = query ? query.toString() : undefined;
        order = order ? order.toString() : config_1.defaultOrder.toString();
        const validatedSort = sort;
        const parsedLimit = limit ? parseInt(limit) : config_1.pgMinLimit;
        const parsedPage = page ? parseInt(page) : config_1.defaultPage;
        try {
            const result = await new services_1.TestService().findAndCountAll({
                limit: parsedLimit,
                page: parsedPage,
                sort: validatedSort,
                order,
            });
            return (0, utils_1.successResponseData)({ data: result.data, metadata: result.metadata, message: "All Articles retrieved.", res });
        }
        catch (error) {
            console.error("Error getting all Articles:", error.message);
            return (0, utils_1.errorResponse)({ errorMessage: error, res, statusCode: 400 });
        }
    }
}
exports.TestController = TestController;
