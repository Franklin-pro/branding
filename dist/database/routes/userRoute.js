"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
exports.router = router;
router.post("/user", async (req, res) => {
    try {
        const { firstName, lastName, email, passWord, confirmPassword } = req.body;
        if (req.body.passWord !== req.body.confirmPassword) {
            res.status(200).json({ message: 'password and confirm password must be matched' });
        }
        const hashPassword = bcrypt_1.default.hashSync(req.body.passWord, 10);
        const user = await user_1.USER.create({ firstName, lastName, email, passWord: hashPassword });
        if (user) {
            res.status(200).json({ message: 'User created successfully', user });
        }
    }
    catch (error) {
        console.log(" error from post", error);
        res.status(500).json({ error: 'Internal server error' });
    }
    router.get("/user", async (req, res) => {
        try {
            const user = await user_1.USER.find({});
            if (user) {
                res.status(200).json({ message: `all User retrived successfully`, user });
            }
            else if (user_1.USER.length === 0) {
                res.status(201).json({ message: `NO USER FOUND`, user });
            }
            else {
                res.status(200).json({ message: 'User not retrived ' });
            }
        }
        catch (error) {
            console.log(" error from post", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    router.delete("/user", async (req, res) => {
        const user = await user_1.USER.deleteMany({});
        try {
            if (user) {
                res.status(200).json({ message: `all users deleted` });
            }
            else {
                res.status(201).json({ message: 'Users not deleted ' });
            }
        }
        catch (error) {
            console.log(" error from post", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    router.get("/user/:id", async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await user_1.USER.findById(userId);
            if (user) {
                res.status(200).json({ message: `user retrived`, user });
            }
            else {
                res.status(201).json({ message: `Users with this ${userId} not found` });
            }
        }
        catch (error) {
            console.log(" error from post", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    router.delete("/user/:id", async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await user_1.USER.findByIdAndDelete(userId);
            if (user) {
                res.status(200).json({ message: `user deleted` });
            }
            else {
                res.status(201).json({ message: `Users with this ${userId} not found` });
            }
        }
        catch (error) {
            console.log(" error from post", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    router.patch("/user/:id", async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await user_1.USER.findByIdAndUpdate(userId, req.body, { new: true });
            if (user) {
                res.status(200).json({ message: `user updated`, user });
            }
            else {
                res.status(201).json({ message: `Users with this ${userId} not found` });
            }
        }
        catch (error) {
            console.log(" error from post", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    router.post("/login", async (req, res) => {
        const SECRET_KEY = "frank";
        try {
            const { email, passWord } = req.body;
            const user = await user_1.USER.findOne({ email });
            if (!user) {
                res.status(201).json({ message: `invalid email or password` });
            }
            else {
                const comparePassword = bcrypt_1.default.compareSync(passWord, user.passWord);
                if (!comparePassword) {
                    res.status(201).json({ message: `invalid email or password` });
                }
                else {
                    const token = jsonwebtoken_1.default.sign({ user: user }, SECRET_KEY, { expiresIn: "1d" });
                    res.status(200).json({
                        token: token,
                        data: {
                            user: user
                        }
                    });
                }
            }
        }
        catch (error) {
        }
    });
});
//# sourceMappingURL=userRoute.js.map