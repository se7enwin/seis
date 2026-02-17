const nodemailer = require("nodemailer");
require("dotenv").config();


const emailRegistro = async ({ email, token }) => {

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false, // 👈 importante para 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Harry Potter App" <no-reply@hp.com>',
    to: email,
    subject: "Comprueba tu cuenta en APV",
    text: "Comprueba tu cuenta en APV",
    html: `<p>Hola: ${email.split('@')[0]}, comprueba tu cuenta en APV.</p>
        <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a> </p>

        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
    `,
  });


};

module.exports = emailRegistro;
