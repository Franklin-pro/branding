"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./userRoute"));
const blogsRoutes_1 = __importDefault(require("./blogsRoutes"));
const contactRoute_1 = __importDefault(require("./contactRoute"));
const commentRoutes_1 = __importDefault(require("./commentRoutes"));
const router = express_1.default.Router();
exports.router = router;
router.use("/user", userRoute_1.default);
router.use("/contact", contactRoute_1.default);
router.use("/blog", blogsRoutes_1.default);
router.use("/comment", commentRoutes_1.default);
//# sourceMappingURL=index.js.map