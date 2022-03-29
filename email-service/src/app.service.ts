import { ForbiddenException, Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

import { config } from 'dotenv';
config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
@Injectable()
export class AppService {
  constructor() {}

  async sendVerifyEmail({ email, token }) {
    return sgMail.send({
      to: [email],
      from: '',
      subject: `Verify Your Email Address`,
      html: `
              <h1>Verify Your Email Address</h1>
              <a href="${process.env.SITE_URL}/verify?token=${token}"> </a>
              <p>${process.env.SITE_URL}/auth/verify?token=${token}</p>
            `,
    });
  }

  async sendResetPasswordEmail({ email, token }) {
    return sgMail.send({
      to: [email],
      from: '',
      subject: `Reset Your Password`,
      html: `
              <h1>Reset Your Password</h1>
              <a href="${process.env.SITE_URL}/auth/reset?token=${token}"> </a>
              <p>${process.env.SITE_URL}/auth/reset?token=${token}</p>
            `,
    });
  }
}
