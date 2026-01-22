const nodemailer = require("nodemailer");

const emailResetPassword = async ({ email, token }) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: '"Harry Potter App" <no-reply@hp.com>',
        to: email,
        subject: "Restablece tu contraseña",
        text: "Restablece tu contraseña",
        html: `
            <p>Solicitaste restablecer tu contraseña.</p>
            <p>Haz click en el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/reset-password/${token}">
                Restablecer contraseña
            </a>
            <p>Este enlace expira en 1 hora.</p>
        `
    });
};



module.exports = emailResetPassword;
