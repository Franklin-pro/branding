"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = void 0;
const success = (res, status, message) => {
    res.status(status).json({
        message: message
    });
};
exports.success = success;
//# sourceMappingURL=sucess.js.map