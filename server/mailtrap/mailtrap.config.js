import dotenv from "dotenv";
import { MailtrapClient } from "mailtrap";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

console.log("Token:", TOKEN);  // should not be undefined
console.log("Endpoint:", ENDPOINT); // sh

const sender = {
  email: "eberevictory3@gmail.com",
  name: "GLAM BOOSTER",
};

const recipients = [
  {
    email: "eberevictory3@gmail.com",
  },
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome",
    text: "Congrats for sending test email",
    category: "Integration Test",
  })
  .then(console.log)
  .catch(console.error);
