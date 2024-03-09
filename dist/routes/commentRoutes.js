"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_commentController_1 = __importDefault(require("../controller/product.commentController"));
const router = express_1.default.Router();
router.post("/", product_commentController_1.default.addComment);
router.get("/", product_commentController_1.default.Comments);
exports.default = router;
//# sourceMappingURL=commentRoutes.js.map