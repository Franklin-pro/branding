"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const product_userController_1 = __importDefault(require("./controller/product.userController"));
const product_blogController_1 = require("./controller/product.blogController");
const product_contactController_1 = require("./controller/product.contactController");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to our first API" });
});
app.post("/", product_userController_1.default.createUser);
app.post("/login", product_userController_1.default.LOGIN);
app.get("/", product_userController_1.default.getAllUsers);
app.get("/:id", product_userController_1.default.getUser);
app.delete("/:id", product_userController_1.default.deleteUser);
app.delete("/", product_userController_1.default.deleteAllUser);
app.post("/", product_blogController_1.blogsController.postBlogs);
app.get("/:id", product_blogController_1.blogsController.getOneBlogs);
app.get("/", product_blogController_1.blogsController.getAllBlogs);
app.delete("/:id", product_blogController_1.blogsController.deleteOneBlogs);
app.delete("/", product_blogController_1.blogsController.deleteAllBlogs);
app.put("/:id", product_blogController_1.blogsController.updateBlogs);
app.post("/", product_contactController_1.contactController.postMessage);
app.get("/:id", product_contactController_1.contactController.getOneMessage);
app.get("/", product_contactController_1.contactController.getAllMessage);
app.delete("/:id", product_contactController_1.contactController.deleteOneMessage);
app.delete("/", product_contactController_1.contactController.updateMessage);
exports.default = app;
//# sourceMappingURL=server.js.map