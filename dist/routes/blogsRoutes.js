"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_blogController_1 = require("../controller/product.blogController");
const verifyAccess_1 = __importDefault(require("../middleware/verifyAccess"));
const upload_1 = __importDefault(require("../validation/upload"));
const verifyAccess_2 = __importDefault(require("../middleware/verifyAccess"));
const router = express_1.default.Router();
router.post("/", product_blogController_1.blogsController.postBlogs);
router.post("/post", upload_1.default.single("image"), product_blogController_1.blogsController.postBlogs);
router.get("/", product_blogController_1.blogsController.getAllBlogs);
router.get("/:id", product_blogController_1.blogsController.getOneBlogs);
router.put("/:id", (0, verifyAccess_2.default)("admin"), product_blogController_1.blogsController.updateBlogs);
router.delete("/:id", (0, verifyAccess_1.default)("admin"), product_blogController_1.blogsController.deleteOneBlogs);
router.delete("/", (0, verifyAccess_2.default)("admin"), product_blogController_1.blogsController.deleteAllBlogs);
router.post("/like/:id", product_blogController_1.blogsController.likeBlog);
router.post("/unlike/:id", product_blogController_1.blogsController.unlikeBlog);
exports.default = router;
//# sourceMappingURL=blogsRoutes.js.map