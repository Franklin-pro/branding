"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_contactController_1 = require("../controller/product.contactController");
const router = express_1.default.Router();
router.post("/", product_contactController_1.contactController.postMessage);
router.get("/", product_contactController_1.contactController.getAllMessage);
router.get("/:id", product_contactController_1.contactController.getOneMessage);
router.delete("/", product_contactController_1.contactController.deleteOneMessage);
router.put("/:id", product_contactController_1.contactController.updateMessage);
exports.default = router;
//# sourceMappingURL=contactRoute.js.map