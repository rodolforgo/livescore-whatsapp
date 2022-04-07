import puppeteer, { ElementHandle } from "puppeteer";
import { Tournaments } from "../data/tournaments";

export class Scores {
    private gameList: string[] = [];

    constructor() { }

    async execute(webpage: string): Promise<string[]> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(webpage);

        const elementHandle = await page.$("#main") as ElementHandle;
        const result = await elementHandle.$$eval("#score-data", (element: any) => element.map((n: HTMLElement) => n.outerText.split("\n")))
        this.gameList = this.getList(result);
        await elementHandle.dispose();
        return this.gameList;
    }

    getList(gamesScraping: string[]): string[] {
        const results = [];
        let getTime, getGame, verify = false;
        for (let i = 0; i < gamesScraping.length; i++) {
            if (Tournaments.search(gamesScraping[0][i]) && !gamesScraping[0][i].includes(" - ")) {
                verify = true;
            }
            if (!Tournaments.search(gamesScraping[0][i]) && !gamesScraping[0][i].includes(" - ")) {
                verify = false;
            } if (verify === true) {
                if (gamesScraping[0][i].includes(" - ") && gamesScraping[0][i].includes("Intervalo")) {
                    getTime = gamesScraping[0][i].substr(0, 9);
                    getGame = gamesScraping[0][i].substr(9, 100);
                    results.push(`[${getTime}] ${getGame}`);
                } else if (gamesScraping[0][i].includes(" - ") && gamesScraping[0][i].includes("1º tempo")) {
                    getTime = gamesScraping[0][i].substr(0, 8);
                    getGame = gamesScraping[0][i].substr(8, 100);
                    results.push(`[${getTime}] ${getGame}`);
                } else if (gamesScraping[0][i].includes(" - ") && gamesScraping[0][i].includes("2º tempo")) {
                    getTime = gamesScraping[0][i].substr(0, 8);
                    getGame = gamesScraping[0][i].substr(8, 100);
                    results.push(`[${getTime}] ${getGame}`);
                }
            }
        }
        return results;
    }
}