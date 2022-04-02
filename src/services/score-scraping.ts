import puppeteer, { ElementHandle } from "puppeteer";

class Scores {
    constructor() { }

    async get() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://m.flashscore.com.br/rugby/?s=2');

        const elementHandle = await page.$('#main') as ElementHandle;
        const gameList = await elementHandle.$$eval("#score-data", (element: any) => element.map((n: HTMLElement) => n.outerText.split("\n")))

        await elementHandle.dispose();
        return gameList;
    }

    
}