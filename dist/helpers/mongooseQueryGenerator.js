"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseQueryGenerator = void 0;
class MongooseQueryGenerator {
    constructor() { }
    static get() {
        if (!MongooseQueryGenerator.instance) {
            MongooseQueryGenerator.instance = new MongooseQueryGenerator();
        }
        return MongooseQueryGenerator.instance;
    }
    searchRegex({ query, fields }) {
        const filter = [];
        for (const field of fields) {
            filter.push({ [field]: { $regex: new RegExp(query, 'i') } });
        }
        return filter;
    }
}
const mongooseQueryGenerator = MongooseQueryGenerator.get();
exports.MongooseQueryGenerator = mongooseQueryGenerator;
