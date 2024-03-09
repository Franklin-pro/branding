"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_1 = require("../model/comment");
const sucess_1 = require("../utils/sucess");
const successMessage_1 = require("../utils/successMessage");
const errorMessage_1 = require("../utils/errorMessage");
class commentController {
    static async addComment(req, res) {
        const comment = await comment_1.Comment.create(req.body);
        if (comment) {
            return (0, successMessage_1.successMessage)(res, 200, `comment added`, comment);
        }
    }
    static async Comments(req, res) {
        const comment = await comment_1.Comment.find();
        if (comment) {
            return (0, successMessage_1.successMessage)(res, 200, `comment added`, comment);
        }
    }
    static async deleteComment(req, res) {
        const comment = await comment_1.Comment.deleteMany();
        if (comment) {
            return (0, sucess_1.success)(res, 201, `comment deleted`);
        }
        else {
            return (0, errorMessage_1.errorMessage)(res, 401, `comment not deleted`);
        }
    }
}
exports.default = commentController;
//# sourceMappingURL=product.commentController.js.map