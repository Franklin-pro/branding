"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactController = void 0;
const contact_1 = require("../model/contact");
const successMessage_1 = require("../utils/successMessage");
const errorMessage_1 = require("../utils/errorMessage");
class contactController {
    static async postMessage(req, res) {
        const { fullName, phone, email, message } = req.body;
        try {
            const messages = await contact_1.Contact.create({ fullName, phone, email, message });
            if (messages) {
                return (0, successMessage_1.successMessage)(res, 200, `message sent successfully`, messages);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 204, `no blog posted`);
            }
        }
        catch (error) {
            console.error("Error deleting user:", error);
            return (0, errorMessage_1.errorMessage)(res, 500, `Internal server error`);
        }
    }
    static async getAllMessage(req, res) {
        try {
            const message = await contact_1.Contact.find();
            if (message) {
                return (0, successMessage_1.successMessage)(res, 200, `all message retrived`, message);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 200, `no blogs retrived`);
            }
        }
        catch (error) {
        }
    }
    static async getOneMessage(req, res) {
        const messageId = req.params.id;
        try {
            const message = await contact_1.Contact.findById(messageId);
            if (message) {
                return (0, successMessage_1.successMessage)(res, 200, `message retrived`, message);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 200, `no message retrived`);
            }
        }
        catch (error) {
        }
    }
    static async deleteOneMessage(req, res) {
        try {
            const message = await contact_1.Contact.deleteMany();
            if (message) {
                return (0, errorMessage_1.errorMessage)(res, 200, `message deleted`);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 400, `no message retrived`);
            }
        }
        catch (error) {
        }
    }
    static async updateMessage(req, res) {
        const messageId = req.params.id;
        try {
            const message = await contact_1.Contact.findByIdAndUpdate(messageId, req.body, { new: true });
            if (message) {
                return (0, successMessage_1.successMessage)(res, 200, `message updated successfully`, message);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 400, `no message updated`);
            }
        }
        catch (error) {
        }
    }
}
exports.contactController = contactController;
//# sourceMappingURL=product.contactController.js.map