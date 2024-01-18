"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const exceptionHandler_1 = __importDefault(require("../middlewares/exceptionHandler"));
const middlewares_1 = require("../middlewares");
const validators_1 = require("../validators");
// import { upload } from '../utils';
const router = express_1.default.Router();
router.post('/', middlewares_1.Validator.check(validators_1.createTest), (0, exceptionHandler_1.default)(async (req, res) => {
    await controllers_1.TestController.create(req, res);
}));
router.get('/qr', (0, exceptionHandler_1.default)(async (req, res) => {
    await controllers_1.TestController.getMyQR(req, res);
}));
router.get('/', (0, exceptionHandler_1.default)(async (req, res) => {
    await controllers_1.TestController.findAll(req, res);
}));
exports.default = router;
