"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyRouter = void 0;
const express_1 = require("express");
const articleRoute_1 = require("./articleRoute");
const testRoute_1 = require("./testRoute");
class ProxyRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes = [
            { segment: '/article/', provider: articleRoute_1.ArticleRoute },
            { segment: '/test/', provider: testRoute_1.TestRouter },
        ];
    }
    static get() {
        if (!ProxyRouter.instance) {
            ProxyRouter.instance = new ProxyRouter();
        }
        return ProxyRouter.instance;
    }
    map() {
        this.routes.forEach((route) => {
            const instance = new route.provider();
            this.router.use(route.segment, instance.router);
        });
        return this.router;
    }
}
const proxyRouter = ProxyRouter.get();
exports.proxyRouter = proxyRouter;
