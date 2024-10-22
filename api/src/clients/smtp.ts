import { createTransport } from "nodemailer";
import { CONFIG } from "@/utils/config";

export const SMTP_TRANSPORT_CONFIG = {
  host: CONFIG.SMTP_HOST,
  from: CONFIG.SMTP_FROM,
  auth: {
    user: CONFIG.SMTP_USERNAME,
    pass: CONFIG.SMTP_PASSWORD,
  },
  port: CONFIG.SMTP_PORT,
};

export async function getSmtpClient() {
  console.log("Init stmp client..");

  return createTransport(SMTP_TRANSPORT_CONFIG);
}

export async function verify() {
  console.log("Verifying SMTP connection..");
  const transporter = await getSmtpClient();

  try {
    await transporter.verify();
    console.log("SMTP Connection established");
  } catch (err) {
    console.error("Error creating SMTP connection", err);
    return;
  }
}

export async function sendVerificationToken(to: string, token: number) {
  if (CONFIG.NODE_ENV === "development") {
    console.log("Skip email sending in development mode");
    console.log("- Verification token:", token);
    return;
  }

  const transporter = await getSmtpClient();
  await transporter.sendMail({
    from: SMTP_TRANSPORT_CONFIG.from,
    to,
    subject: `Your ${CONFIG.APP_NAME} verification token`,
    text: `Hi,\n
We received a request to verify your email address at ${CONFIG.APP_DOMAIN}.\n
Your verification token is: ${token} \n
This token expires in 20 minutes. \n\n
******************** \n
If you did not request this token, you can safely ignore this email.`,
  });
}
