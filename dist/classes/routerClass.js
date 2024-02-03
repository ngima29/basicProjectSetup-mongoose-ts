"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterClass = void 0;
const express_1 = require("express");
class RouterClass {
    constructor() {
        this.router = (0, express_1.Router)();
        this.define();
    }
    define() { }
}
exports.RouterClass = RouterClass;
