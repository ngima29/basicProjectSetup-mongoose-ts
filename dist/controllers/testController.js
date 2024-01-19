"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
const config_1 = require("../config");
const moment_1 = __importDefault(require("moment"));
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
        //const timezoneOffset = req.headers['timezone-offset'];
        const timezoneOffset = req.headers['timezone-offset'];
        const validOffset = timezoneOffset !== undefined ? timezoneOffset : 0;
        const localTime = (0, moment_1.default)().utcOffset(validOffset).format('MMMM Do YYYY, h:mm:ss a');
        console.log("hahahahha", localTime);
        try {
            const data = await new services_1.TestService().getMyQR(localTime);
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
