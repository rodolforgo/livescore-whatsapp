import { Webpages } from "../data/webpages";
import { Scores } from "../services/score-scraping";
import { WAConection } from "../services/wa-connection";

export class Controller {
    private inProgress: string[] = [];
    private closed: string[] = [];

    constructor(private waConnection: WAConection, private score: Scores) { }

    execute() {
        // this.waConnection.execute();

        const getData = setInterval(async () => {
            this.inProgress = await this.score.execute(Webpages.pageScores);
            console.log(this.inProgress);
        }, 5000);
    }
}