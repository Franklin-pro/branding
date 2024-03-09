"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataChecker = void 0;
const product_user_1 = require("../model/product.user");
const errorMessage_1 = require("../utils/errorMessage");
class dataChecker {
    static async inputIsEmpty(req, res, next) {
        const { username, email, password, confirmPassword } = req.body;
        if (username == "") {
            return (0, errorMessage_1.errorMessage)(res, 201, `firstName is empty please fill`);
        }
        else if (email == "") {
            return (0, errorMessage_1.errorMessage)(res, 201, `email is empty please fill`);
        }
        else if (password == "") {
            return (0, errorMessage_1.errorMessage)(res, 201, `password is empty please fill`);
        }
        else if (confirmPassword == "") {
            return (0, errorMessage_1.errorMessage)(res, 201, `confirm password is empty please fill`);
        }
        else {
            next();
        }
    }
    static async EmailExist(req, res, next) {
        const { email } = req.body;
        const user = await product_user_1.USER.findOne({ email });
        if (user) {
            return (0, errorMessage_1.errorMessage)(res, 200, `email exist`);
        }
        else {
            next();
        }
    }
}
exports.dataChecker = dataChecker;
//# sourceMappingURL=dataCheker.js.map