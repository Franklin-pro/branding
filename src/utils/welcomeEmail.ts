import nodemailer from "nodemailer";

interface UserInfo {
    id: number;
    name: string;
    email: string;
    firstName: string;
}

const welcomeEmail = async (userinfo:UserInfo) => {
    let transport = nodemailer.createTransport({
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
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export default welcomeEmail;