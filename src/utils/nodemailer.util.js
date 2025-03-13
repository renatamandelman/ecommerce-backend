import { createTransport } from "nodemailer";
const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = process.env;

async function verifyAccount(to, verifyCode) {
  try {
    const pass = GOOGLE_PASSWORD;
    const user = GOOGLE_EMAIL;
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });
    await transport.sendMail({
      from: `CODER COMMERCE <${user}>`,
      to,
      subject: "Verify your coder commerce account",
      html: `YOUR VERIFY TOKEN IS:${verifyCode}`,
    });
  } catch (error) {
    throw error;
  }
}
export default verifyAccount;
