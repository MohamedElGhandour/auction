"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCancelEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const sendgridAPIKey = process.env.SENDGRID_API_KEY;
mail_1.default.setApiKey(sendgridAPIKey);
const sendCancelEmail = (email, name) => {
    const msg = {
        to: email,
        from: "first1web@gmail.com",
        subject: "We Will Miss You!",
        html: `<strong>Hi ${name}. Let me know why you cancel your account?.</strong>`,
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
exports.sendCancelEmail = sendCancelEmail;
