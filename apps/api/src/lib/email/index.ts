import { AppConfig } from "@/config/app.config";
import { Env } from "@/env";
import { logger } from "@/lib/logger";
import { renderToString } from "hono/jsx/dom/server";
import { Resend } from "resend";
import {
  ForgotPassword,
  type ForgotPasswordProps,
} from "./templates/ForgotPassword";

const EMAIL_CONFIG = {
  ForgotPassword: {
    template: ForgotPassword,
    subject: "Password Reset Request",
    params: {} as ForgotPasswordProps,
  },
  // Add more email types here as needed
} as const;
type EmailType = keyof typeof EMAIL_CONFIG;

const resend = new Resend(Env.RESEND_API_KEY);

export async function sendEmail(
  emailTo: string,
  type: EmailType,
  params: (typeof EMAIL_CONFIG)[EmailType]["params"],
) {
  try {
    logger.info("Sending email...");

    if (Env.NODE_ENV === "development") {
      logger.debug(params, "Email params");
    }

    const config = EMAIL_CONFIG[type];
    const html = renderToString(config.template(params));

    const { error } = await resend.emails.send({
      from: AppConfig.EMAIL.EMAIL_FROM,
      to: emailTo,
      subject: config.subject,
      html,
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    logger.info(`Email of type '${type}' sent to '${emailTo}' successfully`);
  } catch (error) {
    logger.error(error, "Error sending email");
  }
}
