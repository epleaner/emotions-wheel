import sgMail from "@sendgrid/mail";
import Mailgun from "mailgun.js";
import formData from "form-data";

/**
 *
 * @param {sgMail.MailDataRequired|{ html: string }} options
 * @returns
 */
export const sendEmail = async (options) => {
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
      mailgun: async () => {
        const mg = new Mailgun(formData);
        const mailgun = mg.client({
          key: apiKey,
          username: "api",
          ...(url ? { url } : {}),
        });
        const params = {
          from: emailFrom,
          ...options,
          ...(options.dynamic_template_data
            ? {
                dynamic_template_data: JSON.stringify(
                  options.dynamic_template_data
                ),
              }
            : {}),
        };
        return mailgun.messages.create(domain, params);
      },
      sendgrid: () => {
        sgMail.setApiKey(apiKey);
        return sgMail.send({ from: emailFrom, ...options });
      },
    }[service && service.toLowerCase()] || ignore
  )().catch(console.error);
};
