"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const blogEmail = async (userinfo, blogData) => {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    if (!email || !password) {
        console.error("Email or password is not defined in environment variables");
        return;
    }
    let transport = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: email,
            pass: password
        },
    });
    let mailoptions = {
        from: email,
        to: userinfo.email,
        subject: `Hello!! ${userinfo.firstName}, We Received new blog`,
        html: `<p>Dear</p><p><b>${userinfo.firstName}</b></p><p> You did know? Alight apply new blog<br><br>
        you received<b> ${blogData.blogName} new blog</b></p>`
    };
    transport.sendMail(mailoptions, function (err, info) {
        if (err) {
            console.error(err);
        }
        else {
            console.log(info);
        }
    });
};
exports.default = blogEmail;
//# sourceMappingURL=blogsEmail.js.map