export class Tournaments {
    static tournaments: string[] = [
        "Super Rugby",
        "Six Nations",
        "League One",
        "Top 14",
        "Premiership Rugby",
        "Copa Currie",
        "Copa dos Campeões Europeus - Playoffs",
        "Super Liga Americana",
        "Copa Challenge",
        "Seven's World Series",
        "Copa de Rugby da Premiership",
        "Copa de Rugby da Premiership - Playoffs"
    ];

    static search(tournament: string): boolean {
        let result = false;
        for (let i = 0; i < this.tournaments.length; i++) {
            if (tournament.includes(this.tournaments[i])) {
                result = true
            }
        }
        return result;
    }
}
