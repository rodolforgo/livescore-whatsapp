import puppeteer, { ElementHandle } from "puppeteer";

export class Scores {
    private gameList!: string[];

    constructor() { }

    async execute() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://m.flashscore.com.br/rugby/?s=2');

        const elementHandle = await page.$('#main') as ElementHandle;
        this.gameList = await elementHandle.$$eval("#score-data", (element: any) => element.map((n: HTMLElement) => n.outerText.split("\n")))
        await elementHandle.dispose();
    }

    getList(): string[] | null {
        return this.gameList;
    }
}