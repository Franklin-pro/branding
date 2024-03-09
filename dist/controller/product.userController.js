"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_user_1 = require("../model/product.user");
const successMessage_1 = require("../utils/successMessage");
const errorMessage_1 = require("../utils/errorMessage");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = require("bcryptjs");
class userController {
    static async createUser(req, res) {
        try {
            const { username, email, password, confirmPassword, role } = req.body;
            console.log('Request body:', req.body);
            if (!password) {
                return (0, errorMessage_1.errorMessage)(res, 400, 'Password is required');
            }
            if (!username) {
                return (0, errorMessage_1.errorMessage)(res, 400, 'username is required');
            }
            const existingUserWithEmail = await product_user_1.USER.findOne({ email });
            if (existingUserWithEmail) {
                return (0, errorMessage_1.errorMessage)(res, 400, 'User with this email already exists');
            }
            const existingUserWithusername = await product_user_1.USER.findOne({ username });
            if (existingUserWithusername) {
                return (0, errorMessage_1.errorMessage)(res, 400, 'username is already taken');
            }
            const hashPassword = bcrypt_1.default.hashSync(password, 10);
            const user = await product_user_1.USER.create({ username: username, email: email, password: hashPassword, role: role });
            if (user) {
                return (0, successMessage_1.successMessage)(res, 200, 'User created', user);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 404, 'Failed to create user');
            }
            console.log({ username: username, email: email, password: hashPassword, role: "user" });
            return (0, successMessage_1.successMessage)(res, 200, `ok`, "ddd");
        }
        catch (error) {
            console.error('Error during user creation:', error);
            return (0, errorMessage_1.errorMessage)(res, 500, 'Internal Server Error');
        }
    }
    static async getAllUsers(req, res) {
        const user = await product_user_1.USER.find();
        if (user) {
            return (0, successMessage_1.successMessage)(res, 200, `all users found ${user.length}`, user);
        }
        else {
            return (0, errorMessage_1.errorMessage)(res, 401, 'users not found');
        }
        ;
    }
    ;
    static async getUser(req, res) {
        const userId = req.params.id;
        const user = await product_user_1.USER.findById(userId);
        if (user) {
            return (0, successMessage_1.successMessage)(res, 200, 'user found', user);
        }
        else {
            return (0, errorMessage_1.errorMessage)(res, 401, 'user not found');
        }
    }
    static async updateUser(req, res) {
        const userId = req.params.id;
        const user = await product_user_1.USER.findByIdAndUpdate(userId, req.body, { new: true });
        if (user) {
            return (0, successMessage_1.successMessage)(res, 200, 'user updated', user);
        }
        else {
            return (0, errorMessage_1.errorMessage)(res, 401, 'user not updated');
        }
        ;
    }
    ;
    static async deleteUser(req, res) {
        const userId = req.params.id;
        const user = await product_user_1.USER.findByIdAndDelete(userId);
        if (user) {
            return (0, successMessage_1.successMessage)(res, 200, 'user deleted successfully', user);
        }
        else {
            return (0, errorMessage_1.errorMessage)(res, 401, 'user not deleted');
        }
        ;
    }
    ;
    static async deleteAllUser(req, res) {
        const user = await product_user_1.USER.deleteMany();
        if (user) {
            return (0, errorMessage_1.errorMessage)(res, 401, 'all users deleted');
        }
        else {
            return (0, errorMessage_1.errorMessage)(res, 401, 'users not deleted');
        }
        ;
    }
    ;
    static async LOGIN(req, res) {
        try {
            const { email, password } = req.body;
            const authUser = await product_user_1.USER.findOne({ email });
            if (!authUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (authUser.password) {
                const passwordMatch = await (0, bcryptjs_1.compare)(password, authUser.password);
                if (!passwordMatch) {
                    return res.status(401).json({ error: 'Incorrect password' });
                }
                const token = jsonwebtoken_1.default.sign({ userId: authUser._id, email: authUser.email, role: authUser.role }, 'franklin');
                return res.status(200).json({ status: "success", user: { _id: authUser._id, username: authUser.username, email: authUser.email, role: authUser.role }, token });
            }
            else {
                return res.status(500).json({ status: "fail", error: 'User password not available' });
            }
        }
        catch (error) {
            console.error('Error during user login:', error);
            return res.status(500).json({ status: "error", error: 'Internal Server Error' });
        }
    }
}
;
exports.default = userController;
//# sourceMappingURL=product.userController.js.map