"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    comment: {
        type: String,
        required: true
    },
    postedAt: {
        type: Date,
        default: Date.now()
    },
    blogs: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Blogs",
        required: true
    },
    users: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "USER",
        required: true
    },
});
const Comment = mongoose_1.default.model('Comment', commentSchema);
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map