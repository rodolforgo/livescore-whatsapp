import { Scores } from "./services/score-scraping";
import { WAConection } from "./services/wa-connection";

const scores = new Scores();
const client = new WAConection();

const app = async () => {
    await scores.execute("");
    const response = scores.getList();
    client.execute();
    console.log(response);
}

app();
