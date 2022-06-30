import * as nodemailer from 'nodemailer';

export class MailerIntegration {
  static async sendMailUsingMailer(payload: {
    to: string;
    subject: string;
    text: string;
  }) {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    const info = await transporter.sendMail({
      from: '"LazerPay 👻" <nj@lazerpay.com>',
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}
