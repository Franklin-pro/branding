
import nodemailer from "nodemailer";

interface UserInfo {
    id: number;
    name: string;
    email: string;
    firstName: string;
}

interface BlogInfo {
    id: number;
    name: string;
    blogName: string;
}

const blogEmail = async (userinfo: UserInfo, blogData: BlogInfo) => {
    
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    
    if (!email || !password) {
        console.error("Email or password is not defined in environment variables");
        return;
    }

    let transport = nodemailer.createTransport({
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
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

export default blogEmail;
