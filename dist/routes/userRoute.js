"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_userController_1 = __importDefault(require("../controller/product.userController"));
const express_1 = __importDefault(require("express"));
const dataCheker_1 = require("../middleware/dataCheker");
const validator_1 = require("../middleware/validator");
const router = express_1.default.Router();
router.post("/", dataCheker_1.dataChecker.inputIsEmpty, dataCheker_1.dataChecker.EmailExist, validator_1.validator.userAccount(), validator_1.validator.InputValidator, product_userController_1.default.createUser);
router.get("/", product_userController_1.default.getAllUsers);
router.get("/:id", product_userController_1.default.getUser);
router.delete("/:id", product_userController_1.default.deleteUser);
router.patch("/:id", product_userController_1.default.updateUser);
router.delete("/", product_userController_1.default.deleteAllUser);
router.post("/login", product_userController_1.default.LOGIN);
exports.default = router;
//# sourceMappingURL=userRoute.js.map