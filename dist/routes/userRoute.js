"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_userController_1 = __importDefault(require("../controller/product.userController"));
const express_1 = __importDefault(require("express"));
const verifyAccess_1 = __importDefault(require("../middleware/verifyAccess"));
const router = express_1.default.Router();
router.post("/", product_userController_1.default.createUser);
router.get("/", (0, verifyAccess_1.default)("admin"), product_userController_1.default.getAllUsers);
router.get("/:id", product_userController_1.default.getUser);
router.delete("/:id", (0, verifyAccess_1.default)("admin"), product_userController_1.default.deleteUser);
router.patch("/:id", (0, verifyAccess_1.default)("admin"), product_userController_1.default.updateUser);
router.delete("/", (0, verifyAccess_1.default)("admin"), product_userController_1.default.deleteAllUser);
router.post("/login", product_userController_1.default.LOGIN);
exports.default = router;
//# sourceMappingURL=userRoute.js.map