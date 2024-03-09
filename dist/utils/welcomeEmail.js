"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const welcomeEmail = async (userinfo) => {
    let transport = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    let mailoptions = {
        from: process.env.EMAIL,
        to: userinfo.email,
        subject: `${userinfo.firstName} Login Done`,
        html: `<p> Dear, <b>${userinfo.firstName}</b></p><br><br>
        <p> Your Login Successfully Done!!!!! <br><br>${userinfo.firstName} Thank you`
    };
    try {
        const info = await transport.sendMail(mailoptions);
        console.log("Email sent:", info);
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
};
exports.default = welcomeEmail;
//# sourceMappingURL=welcomeEmail.js.map