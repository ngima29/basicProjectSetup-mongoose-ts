"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const speakeasy_1 = __importDefault(require("speakeasy"));
const moment_1 = __importDefault(require("moment"));
const qrcode_1 = __importDefault(require("qrcode"));
class TestService {
    async create(input) {
        let date = (0, moment_1.default)().format('MMMM Do YYYY, h:mm:ss a');
        console.log("create date in server", date);
        try {
            const data = await models_1.TestModel.findOne({});
            //    console.log("data",data)
            if (!data)
                throw new Error(`Employee not found or already deleted`);
            if (input.otp) {
                const verified = speakeasy_1.default.totp.verify({
                    secret: data.secret,
                    encoding: 'base32',
                    token: input.otp,
                    window: 2
                });
                if (!verified)
                    throw new Error(`Invalid OTP for clock-in!!!`);
                console.log("verified", verified);
            }
            const inputDate = (0, moment_1.default)(input.dateTime, 'MMMM Do YYYY, h:mm:ss a');
            input.time = inputDate.format('h:mm:ss a');
            input.date = inputDate.format('YYYY-MM-DD');
            const created = await models_1.TestModel.create(input);
            return created;
        }
        catch (error) {
            throw error;
        }
    }
    async getMyQR(localTime) {
        // const newSecret:any = speakeasy.generateSecret({ name: "Hiup Solution", length: 28 });
        // let date =  moment().format('MMMM Do YYYY, h:mm:ss a');
        // console.log("QR  genareta date date",date)
        const userData = {
            name: "Hiup Solution",
            length: 28,
            localTime,
        };
        const newSecretWithUserData = speakeasy_1.default.generateSecret(userData);
        try {
            //  await TestModel.create({ secret: newSecretWithUserData.base32 })
            await models_1.TestModel.updateMany({ uid: '555' }, { secret: newSecretWithUserData.base32 });
            const data = await qrcode_1.default.toDataURL(newSecretWithUserData.otpauth_url);
            return data;
        }
        catch (error) {
            throw new Error('Error updating or creating document and generating QR code');
        }
    }
    async findAndCountAll({ page, limit, query, sort, order, }) {
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
            const count = filter.length > 0
                ? await models_1.TestModel.countDocuments({ $and: filter, deletedAt: null }).select('-deletedAt')
                : await models_1.TestModel.countDocuments({ deletedAt: null }).select('-deletedAt');
            const articles = filter.length > 0
                ? await models_1.TestModel.find({ $and: filter, deletedAt: null }).select('-deletedAt')
                    .skip(skip)
                    .limit(limit)
                    .sort({ [sort]: order === 'desc' ? -1 : 1 })
                : await models_1.TestModel.find({ deletedAt: null }).select('-deletedAt')
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
exports.TestService = TestService;
