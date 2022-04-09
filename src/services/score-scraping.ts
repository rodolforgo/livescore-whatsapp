import puppeteer, { ElementHandle, TimeoutSettings } from "puppeteer";
import { Tournaments } from "../data/tournaments";

export class Scores {
    private gameList: string[] = [];
    private currentScores: string[] = [];
    private listClosedGames: string[] = [];
    private newGamesClosed: string[] = [];

    constructor() { }

    async execute(webpage: string, gameStatus: string): Promise<string[]> {
        const result = await this.scrape(webpage);
        if (gameStatus === "current") {
            this.currentScores = this.checkUpdate(result, "current");
            this.gameList = result;
            return this.currentScores;
        }
        else if (gameStatus === "closed") {
            this.newGamesClosed = this.checkUpdate(result, "closed");
            this.listClosedGames = result;
            return this.newGamesClosed;
        }
        return [];
    }

    async scrape(webpage: string): Promise<string[]> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(webpage);

        const elementHandle = await page.$("#main") as ElementHandle;
        const result = await elementHandle.$$eval("#score-data", (element: any) => element.map((n: HTMLElement) => n.outerText.split("\n")))
        await elementHandle.dispose();

        const formatedList = this.createList(result[0]);
        return formatedList;
    }

    createList(gamesScraping: string[]): string[] {
        const results = [];
        let getTime, getGame, tournamentEnabled = false, verify = false;
        for (let i = 0; i < gamesScraping.length; i++) {

            tournamentEnabled = Tournaments.search(gamesScraping[i]);
            if (tournamentEnabled && (gamesScraping[i].includes(" - Playoffs") || !gamesScraping[i].includes(" - "))) {
                verify = true;
            }
            if (!tournamentEnabled && !gamesScraping[i].includes(" - ")) {
                verify = false;
            }
            if (verify) {
                if (gamesScraping[i].includes(" - ") && gamesScraping[i].includes("Intervalo")) {
                    getTime = gamesScraping[i].substr(0, 9);
                    getGame = gamesScraping[i].substr(9, 100);
                    results.push(`[${getTime}] ${getGame}`);
                } else if (gamesScraping[i].includes(" - ") && gamesScraping[i].includes("1º tempo")) {
                    getTime = gamesScraping[i].substr(0, 8);
                    getGame = gamesScraping[i].substr(8, 100);
                    results.push(`[${getTime}] ${getGame}`);
                } else if (gamesScraping[i].includes(" - ") && gamesScraping[i].includes("2º tempo")) {
                    getTime = gamesScraping[i].substr(0, 8);
                    getGame = gamesScraping[i].substr(8, 100);
                    results.push(`[${getTime}] ${getGame}`);
                }
                else if (gamesScraping[i].includes(" - ") && !isNaN(Number(gamesScraping[i].charAt(3)))) {
                    getGame = gamesScraping[i].substr(5, 100);
                    results.push(`[Encerrado] ${getGame}`);
                }
            }
        }
        return results;
    }

    checkUpdate(results: string[], gameStatus: string) {
        const status = {
            closed: this.listClosedGames,
            current: this.gameList,
        }[gameStatus] || [];
        const newResults = [];

        for (let i = 0; i < results.length; i++) {
            if (status.findIndex((element) => element === results[i]) === -1) {
                console.log("Nova atualização:", results[i])
                newResults.push(results[i]);
            }
        }
        return newResults;
    }
}