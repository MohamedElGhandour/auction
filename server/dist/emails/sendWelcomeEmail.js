"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWelcomeEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const sendgridAPIKey = process.env.SENDGRID_API_KEY;
mail_1.default.setApiKey(sendgridAPIKey);
const sendWelcomeEmail = (email, name) => {
    const msg = {
        to: email,
        from: "first1web@gmail.com",
        subject: "Thanks for joining in!",
        html: `<strong>Welocme to the app, ${name}. Let me know how you get along with the app.</strong>`,
    };
    mail_1.default
        .send(msg)
        .then(() => {
        console.log("Email sent");
    })
        .catch((error) => {
        console.error(error.response.body);
    });
};
exports.sendWelcomeEmail = sendWelcomeEmail;
