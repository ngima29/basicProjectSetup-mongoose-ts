"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
const config_1 = require("../config");
class ArticleController {
    constructor() { }
    static async create(req, res, imagePath) {
        const data = req.body;
        if (imagePath) {
            data.image = imagePath;
        }
        try {
            const result = await new services_1.ArticleService().create(data);
            return (0, utils_1.successResponseData)({ data: result, message: "Article data is created.", res });
        }
        catch (error) {
            console.error("Error creating Article:", error.message);
            return (0, utils_1.errorResponse)({ errorMessage: error, res, statusCode: 400 });
        }
    }
    ;
    static async update(req, res) {
        const { id } = req.params;
        const updates = req.body;
        try {
            const updated = await new services_1.ArticleService().update(id, updates);
            if (updated) {
                return (0, utils_1.successResponseData)({ data: updated, message: "Article data is updated.", res });
            }
        }
        catch (error) {
            console.error("Error updating Article:", error.message);
            return (0, utils_1.errorResponse)({ errorMessage: error, res, statusCode: 404 });
        }
    }
    static async remove(req, res) {
        const { id } = req.params;
        try {
            const isDeleted = await new services_1.ArticleService().delete(id);
            if (isDeleted) {
                return (0, utils_1.successResponseData)({ message: "Article data is deleted.", res });
            }
        }
        catch (error) {
            console.error("Error deleting Article:", error.message);
            return (0, utils_1.errorResponse)({ errorMessage: error, res, statusCode: 404 });
        }
    }
    static async getById(req, res) {
        const { id } = req.params;
        try {
            const data = await new services_1.ArticleService().getById(id);
            if (data) {
                return (0, utils_1.successResponseData)({ data, message: "Article data found.", res });
            }
        }
        catch (error) {
            console.error("Error getting Article by ID:", error.message);
            return (0, utils_1.errorResponse)({ errorMessage: error, res, statusCode: 404 });
        }
    }
    static async findAll(req, res) {
        let { limit, sort, order, title, author, query, tags, page } = req.query;
        sort = sort || config_1.defaultSort;
        query = query ? query.toString() : undefined;
        order = order ? order.toString() : config_1.defaultOrder.toString();
        tags = tags ? tags.toString() : undefined;
        author = author ? author.toString() : undefined;
        title = title ? title.toString() : undefined;
        const validatedSort = sort;
        const parsedLimit = limit ? parseInt(limit) : config_1.pgMinLimit;
        const parsedPage = page ? parseInt(page) : config_1.defaultPage;
        try {
            const result = await new services_1.ArticleService().findAndCountAll({
                limit: parsedLimit,
                page: parsedPage,
                sort: validatedSort,
                order,
                author,
                query,
                title,
                tags,
            });
            return (0, utils_1.successResponseData)({ data: result.data, metadata: result.metadata, message: "All Articles retrieved.", res });
        }
        catch (error) {
            console.error("Error getting all Articles:", error.message);
            return (0, utils_1.errorResponse)({ errorMessage: error, res, statusCode: 400 });
        }
    }
}
exports.ArticleController = ArticleController;
