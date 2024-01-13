"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const slug_1 = __importDefault(require("slug"));
const models_1 = require("../models");
const helpers_1 = require("../helpers");
class ArticleService {
    async create(input) {
        const inputSlug = (0, slug_1.default)(input.title);
        const dataExists = await models_1.ArticleModel.findOne({ slug: inputSlug, deletedAt: null });
        if (dataExists)
            throw new Error(`Article: ${input.title} is already exists!`);
        input.slug = inputSlug;
        const created = await models_1.ArticleModel.create(input);
        return created;
    }
    async update(id, updates) {
        const dataExists = await models_1.ArticleModel.findOne({
            _id: id,
            deletedAt: { $ne: null },
        });
        if (dataExists)
            throw new Error(`Given id: ${id} is not found or already deleted`);
        if (updates.title) {
            const updateSlug = (0, slug_1.default)(updates.title);
            const dataExists = await models_1.ArticleModel.findOne({ slug: updateSlug, deletedAt: null });
            if (dataExists)
                throw new Error(`Article: ${updates.title} is already exists!`);
            updates.slug = updateSlug;
        }
        const updatedData = await models_1.ArticleModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedData)
            throw new Error(`Failed to update id : ${id} `);
        return updatedData;
    }
    async getById(id) {
        const dataExists = await models_1.ArticleModel.findOne({ _id: id, deletedAt: null }).select('-deletedAt');
        if (!dataExists)
            throw new Error(`Given id : ${id} is not found`);
        return dataExists;
    }
    async delete(id) {
        const deletedData = await models_1.ArticleModel.findOne({ _id: id, deletedAt: { $ne: null }, });
        if (deletedData)
            throw new Error(`Given id: ${id} is not found or already deleted`);
        const deleted = await models_1.ArticleModel.findByIdAndUpdate(id, { $set: { deletedAt: new Date() } }, { new: true });
        return true;
    }
    async findOne(query) {
        const dataExists = await models_1.ArticleModel.findOne(query);
        if (!dataExists)
            throw new Error(`Data not found for the given query: ${JSON.stringify(query)}`);
        return dataExists;
    }
    async findAndCountAll({ page, limit, query, sort, order, tags, title, author, }) {
        try {
            if (isNaN(page) || isNaN(limit)) {
                throw new Error('Invalid page or limit');
            }
            const skip = Math.max((page - 1), 0) * limit;
            const queryGenerator = helpers_1.MongooseQueryGenerator;
            const filter = [];
            if (query) {
                filter.push(...queryGenerator.searchRegex({ query, fields: ['title'] }));
            }
            if (tags) {
                filter.push({ tags });
            }
            if (title) {
                filter.push(...queryGenerator.searchRegex({ query: title, fields: ['title'] }));
            }
            if (author) {
                filter.push(...queryGenerator.searchRegex({ query: author, fields: ['author'] }));
            }
            const count = filter.length > 0
                ? await models_1.ArticleModel.countDocuments({ $and: filter, deletedAt: null }).select('-deletedAt')
                : await models_1.ArticleModel.countDocuments({ deletedAt: null }).select('-deletedAt');
            const articles = filter.length > 0
                ? await models_1.ArticleModel.find({ $and: filter, deletedAt: null }).select('-deletedAt')
                    .skip(skip)
                    .limit(limit)
                    .sort({ [sort]: order === 'desc' ? -1 : 1 })
                : await models_1.ArticleModel.find({ deletedAt: null }).select('-deletedAt')
                    .skip(skip)
                    .limit(limit)
                    .sort({ [sort]: order === 'asc' ? -1 : 1 });
            const metadata = {
                previousPage: page > 0 ? page - 1 : null,
                currentPage: page,
                nextPage: skip + articles.length < count ? page + 1 : null,
                perPage: limit,
            };
            return { metadata, data: { count, rows: articles } };
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ArticleService = ArticleService;
