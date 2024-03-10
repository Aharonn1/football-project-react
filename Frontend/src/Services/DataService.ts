import { PlayersActionType, playersStore } from "../Redux/taskState";
import TableModel from "../Models/TableModel";
import TeamModel from "../Models/TeamModel";
import appConfig from "../Utils/AppConfig";
import axios from "axios";
import { SetStateAction } from "react";

class DataService {

    async getAllPlayers(): Promise<TeamModel[]> {
        try {
            let players = playersStore.getState().players;
            if (players.length === 0) {
                const response = await axios.get<TeamModel[]>(appConfig.playersUrl);
                players = response.data;
                playersStore.dispatch({ type: PlayersActionType.FetchPlayers, payload: players })
            }
            return players;
        } catch (err) {
            console.log(err)
        }
    }

    async getTopGoalScorers(): Promise<TeamModel[]> {
        try {
            let players = playersStore.getState().topPlayers;
            if (players.length === 0) {
                const response = await axios.get<TeamModel[]>(appConfig.topPlayerGoalsUrl);
                players = response.data;
                playersStore.dispatch({ type: PlayersActionType.FetchTopPlayers, payload: players })
            }
            return players;
        } catch (err) {
            console.log(err)
        }
    }

    async getTopAssists(): Promise<TeamModel[]> {
        try {
            let players = playersStore.getState().topPlayers;
            if (players.length === 0) {
                const response = await axios.get<TeamModel[]>(appConfig.topPlayerAssistsUrl);
                players = response.data;
                playersStore.dispatch({ type: PlayersActionType.FetchTopAssists, payload: players })
            }
            return players;
        } catch (err) {
            console.log(err)
        }
    }

    async getTheTable(): Promise<TableModel[]> {
        try {
            let table = playersStore.getState().table;
            if (table.length === 0) {
                const response = await axios.get<TableModel[]>(appConfig.tableUrl);
                table = response.data;
                playersStore.dispatch({ type: PlayersActionType.FetchTable, payload: table })
            }
            return table;
        } catch (err) {
            console.log(err)
        }
    }

    async getAwayTeam(): Promise<TableModel[]> {
        try {
            let table = playersStore.getState().table;
            if (table.length === 0) {
                const response = await axios.get<TableModel[]>(appConfig.awayTeamUrl);
                table = response.data;
                playersStore.dispatch({ type: PlayersActionType.FetchTable, payload: table })
            }
            return table;
        } catch (err) {
            console.log(err)
        }
    }

    async getHomeTeam(): Promise<TableModel[]> {
        try {
            let table = playersStore.getState().table;
            if (table.length === 0) {
                const response = await axios.get<TableModel[]>(appConfig.homeTeamUrl);
                table = response.data;
                playersStore.dispatch({ type: PlayersActionType.FetchTable, payload: table })
            }
            return table;
        } catch (err) {
            console.log(err)
        }
    }


    async getManchesterResult(): Promise<TableModel[]> {
        try {
            let table = playersStore.getState().table;
            if (table.length === 0) {
                const response = await axios.get<TableModel[]>(appConfig.manchesterUrl);
                table = response.data;
                playersStore.dispatch({ type: PlayersActionType.FetchTableManchester, payload: table })
            }
            return table;
        } catch (err) {
            console.log(err)
        }
    }

    getTheResult() {
        let table = playersStore.getState().table;
        let players = playersStore.getState().topPlayers;
        const allItems = [...table];

        allItems.sort(() => Math.random() - 0.5);

        let winners: SetStateAction<any[]> = [];
        let losers: SetStateAction<any[]> = [];
        for (let i = 0; i < allItems.length; i++) {
            const alreadyWon = winners.some((winner) => winner.teamId === allItems[i].teamId);
            const alreadyLost = losers.some((loser) => loser.teamId === allItems[i].teamId);

            if (!alreadyWon && !alreadyLost) {
                if (i < 10 && allItems[i].games <= 37) {
                    // if ("Manchester United" === allItems[i].name)
                        // console.log(i)
                    allItems[i].awayTeam = 0;
                    allItems[i].awayTeam += 1;
                    allItems[i].goals = 3;
                    const randomNumber = Math.floor(Math.random() * 3);
                    allItems[i].goals += randomNumber;
                    allItems[i].awayTeam = winners.push(allItems[i])
                    console.log(allItems[i].goals >= 3)
                } else if (allItems[i].games <= 37) {
                    console.log(i)
                    allItems[i].homeTeam = 0;
                    allItems[i].homeTeam += 1;
                    allItems[i].goals = 2;
                    const randomNumber = Math.floor(Math.random() * 3);
                    allItems[i].goals -= randomNumber
                    allItems[i].homeTeam = losers.push(allItems[i]);
                }
            }
        }

        for (const winner of winners) {
            if (winner.games <= 37) {
                winner.points += 3;
                winner.wins += 1;
                winner.lastGames += "✔"
            }
        }

        for (const loser of losers) {
            if (loser.games <= 37) {
                loser.loses += 1;
                loser.lastGames += "❌"
            }
        }

        for (const game of table) {
            if (game.games <= 37) {
                game.games += 1;
            }
        }

        const scoredPlayer1 = players[Math.floor(Math.random() * players.length)];
        const scoredPlayer2 = players[Math.floor(Math.random() * players.length)];
        const assistPlayer1 = players[Math.floor(Math.random() * players.length)];
        const assistPlayer2 = players[Math.floor(Math.random() * players.length)];

        let actionExecuted = false;

        for (let i = 18; i < allItems.length; i++) {
            if (allItems[i].games <= 37 && !actionExecuted) {
                scoredPlayer1.goals += 1;
                scoredPlayer2.goals += 1;
                assistPlayer1.assists += 1;
                assistPlayer2.assists += 1;
                actionExecuted = true;
            }
        }
    }
}
const dataService = new DataService();
export default dataService;