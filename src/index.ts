import { Scores } from "./services/score-scraping";

console.log("Estruturação inicial realizada com sucesso!");

const scores = new Scores();

const teste = async () => {
    await scores.execute();
    const response = scores.getList();
    console.log(response);
}

teste();
