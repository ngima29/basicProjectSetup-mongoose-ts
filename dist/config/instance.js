"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    constructor() {
        this.url = process.env.MONGO_URL;
        mongoose_1.default.Promise = global.Promise;
    }
    static get() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    async connect() {
        try {
            await mongoose_1.default.connect(this.url);
            console.log('✔ Database Connected');
        }
        catch (error) {
            console.error('✘ MONGODB ERROR: ', error.message);
            throw error;
        }
    }
}
const database = Database.get();
exports.Database = database;
