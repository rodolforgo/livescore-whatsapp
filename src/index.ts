import { Scores } from "./services/score-scraping";
import { WAConection } from "./services/wa-connection";

console.log("Estruturação inicial realizada com sucesso!");

const scores = new Scores();
const client = new WAConection();

const teste = async () => {
    await scores.execute();
    const response = scores.getList();
    client.execute();
    console.log(response);
}

teste();
