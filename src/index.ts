import { Resend } from "resend";
import { render } from "@react-email/render";
import * as React from "react";
import MailAdapter from "./mail-adapter";
import VerificationEmail from "./templates/VerificationEmail";
import PasswordResetEmail from "./templates/PasswordResetEmail";

/**
 * Resend Email Adapter for Parse Server
 * Uses Resend API to send emails
 */
type CustomTemplate = (props: any) => React.ReactElement;

export interface ResendAdapterOptions {
  apiKey: string;
  defaultFrom: string;
  brandLogoUrl?: string;
  brandColor?: string;
  templates?: {
    verification?: CustomTemplate;
    passwordReset?: CustomTemplate;
  };
}

export class ResendEmailAdapter extends MailAdapter {
  private resend: Resend;
  private defaultFrom: string;
  private brandLogoUrl?: string;
  private brandColor: string;
  private customVerificationTemplate?: CustomTemplate;
  private customPasswordResetTemplate?: CustomTemplate;

  constructor(options: ResendAdapterOptions) {
    super();
    if (!options.apiKey) {
      throw new Error("ResendEmailAdapter requires an API key");
    }
    if (!options.defaultFrom) {
      throw new Error("ResendEmailAdapter requires a defaultFrom email address");
    }
    this.resend = new Resend(options.apiKey);
    this.defaultFrom = options.defaultFrom;
    this.brandLogoUrl = options.brandLogoUrl;
    this.brandColor = options.brandColor || "#000000";
    this.customVerificationTemplate = options.templates?.verification;
    this.customPasswordResetTemplate = options.templates?.passwordReset;
  }

  /**
   * Send email using Resend API
   * @param options Email options containing to, subject, text, and optionally html and from
   */
  async sendMail(options: {
    to: string;
    subject: string;
    text: string;
    html?: string;
    from?: string;
  }) {
    try {
      const emailData = {
        from: options.from || this.defaultFrom,
        to: options.to,
        subject: options.subject,
        text: options.text,
        ...(options.html && { html: options.html }),
      };

      const { data, error } = await this.resend.emails.send(emailData);

      if (error) {
        throw new Error(`Resend API error: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error("Failed to send email:", error);
      throw error;
    }
  }

  /**
   * Send verification email using React Email template
   */
  async sendVerificationEmail({
    link,
    appName,
    user,
  }: {
    link: string;
    appName: string;
    user: any;
  }) {
    try {
      const userEmail = user.get("email");

      if (!userEmail) {
        throw new Error("User email is required but was not found");
      }

      // Use custom template if provided, otherwise use default template
      const templateToUse = this.customVerificationTemplate || VerificationEmail;

      const templateProps = {
        link,
        appName,
        brandLogoUrl: this.brandLogoUrl,
        brandColor: this.brandColor,
      };

      const html = await render(templateToUse(templateProps));
      const text = await render(templateToUse(templateProps), { plainText: true });

      const emailData = {
        from: this.defaultFrom,
        to: userEmail,
        subject: `Verify your email address for ${appName}`,
        html,
        text,
      };

      const { data, error } = await this.resend.emails.send(emailData);

      if (error) {
        throw new Error(`Resend API error: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error("Failed to send verification email:", error);
      throw error;
    }
  }

  /**
   * Send password reset email using React Email template
   */
  async sendPasswordResetEmail({
    link,
    appName,
    user,
  }: {
    link: string;
    appName: string;
    user: any;
  }) {
    try {
      const userEmail = user.get("email");

      if (!userEmail) {
        throw new Error("User email is required but was not found");
      }

      // Use custom template if provided, otherwise use default template
      const templateToUse = this.customPasswordResetTemplate || PasswordResetEmail;

      const templateProps = {
        link,
        appName,
        brandLogoUrl: this.brandLogoUrl,
        brandColor: this.brandColor,
      };

      const html = await render(templateToUse(templateProps));
      const text = await render(templateToUse(templateProps), { plainText: true });

      const emailData = {
        from: this.defaultFrom,
        to: userEmail,
        subject: `Reset your password for ${appName}`,
        html,
        text,
      };

      const { data, error } = await this.resend.emails.send(emailData);

      if (error) {
        throw new Error(`Resend API error: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error("Failed to send password reset email:", error);
      throw error;
    }
  }
}

// Default export
export default ResendEmailAdapter;
