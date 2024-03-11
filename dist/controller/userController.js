"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_1 = require("../model/user");
const errorMessage_1 = require("../utils/errorMessage");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const successMessage_1 = require("../utils/successMessage");
const loginSuccess_1 = require("../utils/loginSuccess");
const sucess_1 = require("../utils/sucess");
class userController {
    static async userCreate(req, res) {
        const { firstName, lastName, email, passWord, confirmPassword, role } = req.body;
        try {
            if (req.body.passWord !== req.body.confirmPassword) {
                return (0, errorMessage_1.errorMessage)(res, 204, 'password and confirmPassword must be match');
            }
            const hashPassword = bcrypt_1.default.hashSync(req.body.passWord, 10);
            const user = await user_1.USER.create({ firstName, lastName, email, role, passWord: hashPassword });
            if (user) {
                return (0, sucess_1.success)(res, 201, `user created`);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 204, `user not created`);
            }
        }
        catch (error) {
            console.log(res, 204, `error from post`, error);
        }
    }
    static async getAllUser(req, res) {
        const user = await user_1.USER.find();
        if (user) {
            return (0, successMessage_1.successMessage)(res, 200, `all ${user.length} user retrived`, user);
        }
        else if (user === 0) {
            return (0, errorMessage_1.errorMessage)(res, 204, `no user found`);
        }
        else {
            return (0, errorMessage_1.errorMessage)(res, 204, `all user retrived`);
        }
    }
    static async getOneUser(req, res) {
        const userId = req.params.id;
        try {
            const user = await user_1.USER.findById(userId);
            if (user) {
                return (0, successMessage_1.successMessage)(res, 200, `user retrived`, user);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 204, `no user found with ${userId}`);
            }
        }
        catch (userId) {
            return (0, errorMessage_1.errorMessage)(res, 204, 'no user ');
        }
    }
    static async deleteOneUser(req, res) {
        const userId = req.params.id;
        try {
            const user = await user_1.USER.findByIdAndDelete(userId);
            if (user) {
                return (0, successMessage_1.successMessage)(res, 200, `User deleted`, userId);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 404, `No user found with ID ${userId}`);
            }
        }
        catch (error) {
            console.error("Error deleting user:", error);
            return (0, errorMessage_1.errorMessage)(res, 500, `Internal server error`);
        }
    }
    static async updateUser(req, res) {
        const userId = req.params.id;
        try {
            const user = await user_1.USER.findByIdAndUpdate(userId, req.body, { new: true });
            if (user) {
                return (0, sucess_1.success)(res, 201, `user updated successfully`);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 404, `No user found with ID ${userId}`);
            }
        }
        catch (error) {
            console.error("Error deleting user:", error);
            return (0, errorMessage_1.errorMessage)(res, 500, `Internal server error`);
        }
    }
    static async deleteAll(req, res) {
        const user = await user_1.USER.deleteMany();
        try {
            if (user) {
                return (0, errorMessage_1.errorMessage)(res, 200, `All User Deleted successfully`);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 404, `No user found with ID`);
            }
        }
        catch (error) {
            console.error("Error deleting user:", error);
            return (0, errorMessage_1.errorMessage)(res, 500, `Internal server error`);
        }
    }
    static async LOGIN(req, res) {
        const { email, passWord } = req.body;
        const secretKey = process.env.SECRET_KEY;
        try {
            if (!secretKey) {
                return (0, errorMessage_1.errorMessage)(res, 500, `Secret key is not defined`);
            }
            const user = await user_1.USER.findOne({ email });
            if (!user) {
                return (0, errorMessage_1.errorMessage)(res, 401, `Invalid email or password`);
            }
            const comparePassword = bcrypt_1.default.compareSync(passWord, user.passWord);
            if (!comparePassword) {
                return (0, errorMessage_1.errorMessage)(res, 401, `Invalid email or password`);
            }
            const token = jsonwebtoken_1.default.sign({ user: user }, secretKey, { expiresIn: '1d' });
            if (token) {
                return (0, loginSuccess_1.loginMessage)(res, 200, `User login successful`, token);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 500, `Failed to generate token`);
            }
        }
        catch (error) {
            console.error("Error during login:", error);
            return (0, errorMessage_1.errorMessage)(res, 500, `Internal server error`);
        }
    }
}
exports.userController = userController;
//# sourceMappingURL=userController.js.map