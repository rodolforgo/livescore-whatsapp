export class Tournaments {
    static tournaments: string[] = [
        "Super Rugby",
        "Six Nations",
        "League One",
        "Top 14",
        "Premiership Rugby",
        "Copa Currie",
        "ALEMANHA: Bundesliga"
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
