const nodemailer = require('nodemailer');

module.exports = async ( emailTemplate ) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            // service: process.env.SERVICE,
            port: Number(process.env.PORT_EMAIL),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: "contact@kabanist.fr",
                pass: process.env.PASS
            }
        });

        await transporter.sendMail( emailTemplate );
        console.log('Email sent successfully')
    } catch (error) {
        console.log("email not sent!");
		console.log(error);
		return error;
    }
}