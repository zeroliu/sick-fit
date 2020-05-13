import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';

let transport: Mail;

async function createTestTransport() {
  const account = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });
}

export async function sendEmail(mailOptions: MailOptions) {
  if (!transport) {
    // TODO: check env and create production transport when in prod.
    transport = await createTestTransport();
  }
  const info = await transport.sendMail(mailOptions);
  if (process.env.NODE_ENV === 'development') {
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  }
}

export function decorateEmail(text: string) {
  return `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Hello There!</h2>
    <p>${text}</p>
  </div>`;
}
