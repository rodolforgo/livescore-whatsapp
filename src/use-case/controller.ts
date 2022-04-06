import { Scores } from "../services/score-scraping";
import { WAConection } from "../services/wa-connection";

export class Controller {
    constructor(private waConnection: WAConection, private score: Scores) { }

    execute() {
        // criar os métodos de timers;
        // Realizar as buscas nos Scores de acordo com o timers;
        // Enviar a msg para o WAConnection após o retorno da busca;
    }
}