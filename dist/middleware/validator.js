"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const express_validator_1 = require("express-validator");
const errorMessage_1 = require("../utils/errorMessage");
class validator {
    static async InputValidator(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return errors.array().map((error) => {
                (0, errorMessage_1.errorMessage)(res, 401, error.msg);
            });
        }
        else {
            next();
        }
    }
    static userAccount() {
        return [
            (0, express_validator_1.check)("email", "Please provide a valid email address").trim().isEmail(),
            (0, express_validator_1.check)("password", "Please provide a strong password starting with a capital letter, mixing numbers and symbols").isStrongPassword()
        ];
    }
}
exports.validator = validator;
//# sourceMappingURL=validator.js.map