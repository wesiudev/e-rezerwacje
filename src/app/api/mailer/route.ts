import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { phone, reciever, message } = await request.json();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // your email address
      pass: process.env.EMAIL_PASSWORD, // your email password
    },
  });

  // validate the receiver email address
  if (!reciever || !isValidEmail(reciever)) {
    return NextResponse.json({ error: "Invalid recipient email address" });
  }

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${phone}`, // sender address
    to: reciever, // list of receivers
    subject: `Nowa wiadomość od klienta <${phone}>`, // Subject line
    html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color:#fff;background:#74B901;padding:20px;">
          <h2 style="font-size: 30px; margin-bottom:20px;">Nowa wiadomość od Klienta</h2>
          <p style="margin-bottom:20px;">Numer telefonu: ${phone}</p>
          <p style="margin-bottom:20px;">Wiadomość:</p>
          <div style="background-color:#fff;padding: 10px 20px 20px 20px;color:black;">
            <p style="margin-bottom: 0;">${message}</p>
          </div>
        </div>
      `,
  });

  return NextResponse.json({ message: info });
}

function isValidEmail(email: string): boolean {
  // simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
