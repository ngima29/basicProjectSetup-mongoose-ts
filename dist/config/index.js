"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSort = exports.defaultOrder = exports.defaultPage = exports.defaultLimit = exports.defaultOffset = exports.pgMaxLimit = exports.pgMinLimit = exports.url = exports.hostUrl = exports.environment = exports.timezone = exports.port = void 0;
const dotenv = __importStar(require("dotenv"));
const enums_1 = require("../enums");
dotenv.config();
/**
 * Your favorite port
 */
exports.port = parseInt(process.env.PORT), exports.timezone = process.env.TIMZEZONE, 
/**
 * Application mode (Set the environment to 'development' by default)
 */
exports.environment = process.env.ENVIRONMENT, 
/**
* HOST URL
*/
exports.hostUrl = process.env.HOST_URL, 
/**
 * Database Connection
 */
exports.url = process.env.DB_URL, 
/** Pagination */
exports.pgMinLimit = 10, exports.pgMaxLimit = 100, exports.defaultOffset = 1, exports.defaultLimit = 10, exports.defaultPage = 1, 
/** Order */
exports.defaultOrder = 'createdAt', exports.defaultSort = enums_1.SortEnum.desc;
__exportStar(require("./instance"), exports);
