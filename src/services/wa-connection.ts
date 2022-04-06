import { Client, LocalAuth } from "whatsapp-web.js";
const qrcode = require('qrcode-terminal');

const waConfig = { puppeteer: { headless: false }, authStrategy: new LocalAuth() };

export class WAConection {
    private client: Client;
    
    constructor() {
        this.client = new Client(waConfig);
    }

    execute() {
        this.client.on('qr', (qr) => {
            console.log('QR Code:', qr);
            qrcode.generate(qr, { small: true });
        });

        this.client.initialize();

        this.client.on('authenticated', () => {
            console.log('Autenticado!');
        });

        this.client.on('auth_failure', msg => {
            console.error('Falha na autenticação.', msg);
        });

        this.client.on('ready', () => {
            console.log('Cliente logado com sucesso!');
        });

        this.client.on('message', async msg => {
            if (msg.body === '!ping') {
                let chat = await msg.getChat();
                console.log(chat)
                msg.reply('pong!');
            }
        });
    }

    sendMsg() {
        this.client.sendMessage("558396324407-1411859188@g.us", 'msg')
    }
}

