import { Client, LocalAuth, MessageContent } from "whatsapp-web.js";
const qrcode = require("qrcode-terminal");

const waConfig = { puppeteer: { headless: false }, authStrategy: new LocalAuth() };
const client = new Client(waConfig);

export class WAConection {
    constructor() { }

    execute() {
        client.on("qr", (qr) => {
            console.log("QR Code:", qr);
            qrcode.generate(qr, { small: true });
        });

        client.initialize();

        client.on("authenticated", () => {
            console.log("Autenticado!");
        });

        client.on("auth_failure", msg => {
            console.error("Falha na autenticação.", msg);
        });

        client.on("ready", () => {
            console.log("Cliente logado com sucesso!");
        });
    }

    sendMsg(address: string, msg: MessageContent) {
        const time = new Date().toLocaleTimeString();
        client.sendMessage(address, msg)
        console.log(`Nova mensagem enviada! ${time}`);
    }
    
    sendPong() {
        client.on("message", async msg => {
            if (msg.body === "!ping") {
                msg.reply("pong");
            } if (msg.body === "!status") {
                let chat = await msg.getChat();
                console.table(chat);
            }
        });
    }
}