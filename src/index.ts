import { Scores } from "./services/score-scraping";
import { WAConection } from "./services/wa-connection";
import { Controller } from "./use-case/controller";

const scores = new Scores();
const client = new WAConection();
const controller = new Controller(client, scores)

const app = async () => {
    controller.execute();    
}

app();
