import { Webpages } from "../data/webpages";
import { Scores } from "../services/score-scraping";
import { WAConection } from "../services/wa-connection";
import dotenv from "dotenv";

dotenv.config();
const timer = Number(process.env.TIMER) * 60000;

export class Controller {
    private inProgress: string[] = [];
    private closed: string[] = [];

    constructor(private waConnection: WAConection, private score: Scores) { }

    async execute() {
        this.waConnection.execute();

        await this.score.execute(Webpages.pageScores, "current");
        await this.score.execute(Webpages.pageGameCloses, "closed");
        console.log("Primeira verificação realizada com sucesso.");

        setInterval(async () => {
            const time = new Date().toLocaleTimeString();
            console.log(`Buscando novas informações... ${time}`);
            this.inProgress = await this.score.execute(Webpages.pageScores, "current");
            this.closed = await this.score.execute(Webpages.pageGameCloses, "closed");

            if (this.inProgress.length || this.closed.length) {
                this.inProgress.length && this.waConnection.sendMsg(process.env.CGRC as string, this.inProgress.join("\n"));
                this.closed.length && this.waConnection.sendMsg(process.env.CGRC as string, this.closed.join("\n"));
                this.inProgress = [];
                this.closed = [];
            } else {
                console.log("Nenhuma atualização encontrada.")
            }

        }, timer);
    }
}