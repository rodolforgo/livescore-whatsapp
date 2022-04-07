import dotenv from "dotenv";

dotenv.config();

export class Webpages {
    static pageScores: string = `${process.env.URL}/handebol/`
    static pageGameCloses: string = `${process.env.URL}/rugby/?d=0&s=3`;
}