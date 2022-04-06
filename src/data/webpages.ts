export class Webpages {
    static pageScores: string;
    static pageGameCloses: string;

    constructor() {
        Webpages.pageScores = `${process.env.URL}/rugby/?s=2`;
        Webpages.pageGameCloses = `${process.env.URL}/rugby/?d=0&s=3`;
    }
}