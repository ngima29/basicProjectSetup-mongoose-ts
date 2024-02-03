"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRouter = void 0;
const classes_1 = require("../classes");
const controllers_1 = require("../controllers");
const exceptionHandler_1 = __importDefault(require("../middlewares/exceptionHandler"));
const middlewares_1 = require("../middlewares");
const validators_1 = require("../validators");
class TestRouter extends classes_1.RouterClass {
    constructor() {
        super();
    }
    define() {
        this.router
            .route("/")
            .get((0, exceptionHandler_1.default)(controllers_1.TestController.findAll))
            .post(middlewares_1.Validator.check(validators_1.createTest), (0, exceptionHandler_1.default)(controllers_1.TestController.create));
        this.router.get('/qr', (0, exceptionHandler_1.default)(controllers_1.TestController.getMyQR));
    }
}
exports.TestRouter = TestRouter;
