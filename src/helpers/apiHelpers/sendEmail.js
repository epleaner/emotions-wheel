import sgMail from "@sendgrid/mail";
import Mailgun from "mailgun.js";
import formData from "form-data";

/**
 *
 * @param {sgMail.MailDataRequired} options
 * @returns
 */
export const sendEmail = (options) => {
  const service = process.env.MAIL_SERVICE;
  const apiKey = process.env.MAIL_API_KEY;
  const domain = process.env.MAIL_DOMAIN;
  const emailFrom = process.env.MAIL_FROM;
  const url = process.env.MAIL_HOST_URL;

  const ignore = async () => {
    console.warn("Unrecognized mail service", service);
  };
  return (
    {
      mailgun: () => {
        const mailgun = new Mailgun(formData).client({
          key: apiKey,
          username: "api",
          ...(url ? { url } : {}),
        });
        return mailgun.messages.create(domain, { from: emailFrom, ...options });
      },
      sendgrid: () => {
        sgMail.setApiKey(apiKey);
        return sgMail.send({ from: emailFrom, ...options });
      },
    }[service && service.toLowerCase()] || ignore
  )().catch(console.error);
};
