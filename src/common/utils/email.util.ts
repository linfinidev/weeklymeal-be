import * as dotenv from 'dotenv';
import { InternalServerErrorException } from '@nestjs/common';
import { Resend } from 'resend';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetLinkEmail = async (email: string, token: string) => {
  try {
    await resend.emails.send({
      from: 'WeeklyMeal <onboarding@resend.dev>',
      to: email,
      subject: 'Weekly meal - Reset your password',
      html: `<p><span style="background: #074e6d; color: #fff;">&nbsp;Weekly Meal&nbsp;</span>&nbsp;- PW Reset</p><p>Please click on this <strong><a href=${process.env.CLIENT_DOMAIN}/forgot-password?token=${token}>link</a></strong> to reset your password.<br />Link only valid for <strong>15 minutes</strong>.</p><p>Please ignore if you didn't make this request.</p>`,
    });
  } catch {
    throw new InternalServerErrorException(
      'Failed to send email. Please try again later.',
    );
  }
};
