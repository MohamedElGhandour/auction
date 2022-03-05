import sgMail from "@sendgrid/mail";

const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPIKey as string);

export const sendCancelEmail = (email: string, name: string) => {
  const msg = {
    to: email, // Change to your recipient
    from: "first1web@gmail.com", // Change to your verified sender
    subject: "We Will Miss You!",
    html: `<strong>Hi ${name}. Let me know why you cancel your account?.</strong>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error.response.body);
    });
};
