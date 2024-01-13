"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
class Validator {
    constructor() {
        this.check = (input) => {
            return (req, res, next) => {
                const { value, error } = input.validate(req.body, {
                    abortEarly: false,
                });
                if (error)
                    next(error);
                req.body = value;
                next();
            };
        };
    }
    static get() {
        if (!Validator.instance) {
            Validator.instance = new Validator();
        }
        return Validator.instance;
    }
}
const validator = Validator.get();
exports.Validator = validator;
