import { UploadedFile } from "express-fileupload";

class TableModel{
    teamId:number;
    name:string;
    imageName:string;
    image:UploadedFile;
    games:number;
    wins:number;
    loses:number;
    points:number;
    draw:number;
    totalWins:number;
    goals:number;
    homeTeam:number;
    awayTeam:number;
    lastGames:number;

    constructor(table:TableModel){
        this.teamId = table.teamId;
        this.name = table.name;
        this.imageName = table.imageName;
        this.image = table.image;
        this.games = table.games;
        this.wins = table.wins;
        this.loses = table.loses;
        this.points = table.points;
        this.draw = table.draw;
        this.totalWins = table.totalWins;
        this.goals = table.goals;
        this.homeTeam = table.homeTeam;
        this.awayTeam = table.awayTeam;
        this.lastGames = table.lastGames;
    }
}
export default TableModel;