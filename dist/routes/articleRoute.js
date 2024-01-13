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
router.post('/', 
//upload.single('image'),
middlewares_1.Validator.check(validators_1.createArticle), (0, exceptionHandler_1.default)(async (req, res) => {
    var _a;
    await controllers_1.ArticleController.create(req, res, (_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
}));
router.patch('/:id', middlewares_1.Validator.check(validators_1.updateArticle), (0, exceptionHandler_1.default)(async (req, res) => {
    await controllers_1.ArticleController.update(req, res);
}));
router.delete('/:id', (0, exceptionHandler_1.default)(async (req, res) => {
    await controllers_1.ArticleController.remove(req, res);
}));
router.get('/:id', (0, exceptionHandler_1.default)(async (req, res) => {
    await controllers_1.ArticleController.getById(req, res);
}));
router.get('/', (0, exceptionHandler_1.default)(async (req, res) => {
    await controllers_1.ArticleController.findAll(req, res);
}));
exports.default = router;
