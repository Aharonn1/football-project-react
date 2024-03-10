import TableModel from "../Models/TableModel";
import TeamModel from "../Models/TeamModel";
import { createStore } from "redux";

export class PlayersState {
    players: TeamModel[] = [];
    topPlayers: TeamModel[] = [];
    table: TableModel[] = [];
    topTeams: TableModel[] = [];
    result: TableModel[] = [];
    tableManchester: TableModel[] = [];
}

export enum PlayersActionType {
    FetchPlayers = "FetchPlayers",
    FetchTopAssists = "FetchTopAssists",
    FetchTopPlayers = "FetchTopPlayers",
    FetchTable = "FetchTable",
    FetchTableManchester = "FetchTableManchester",
    FetchWinsAndLosses = "FetchWinsAndLosses",
    FetchTeamWinsTable = "FetchTeamWinsTable",
    DeletePlayer = "DeletePlayer",
}

export interface PlayersAction {
    type: PlayersActionType;
    payload: any
}

export function playersReducer(currentState = new PlayersState(), action: PlayersAction): PlayersState {
    const newState = { ...currentState };

    switch (action.type) {
        case PlayersActionType.FetchPlayers:
            newState.players = action.payload;
            break;

        case PlayersActionType.FetchTopPlayers:
            if (action.payload.length > 0) {
                const topPlayers = action.payload.sort((a: { goals: number; }, b: { goals: number; }) => b.goals - a.goals);
                const top5Players = topPlayers.slice(0, 5);
                return {
                    ...currentState,
                    topPlayers: top5Players,
                };
            }
            break;

        case PlayersActionType.FetchTopAssists:
            if (action.payload.length > 0) {
                const topPlayers = action.payload.sort((a: { assists: number; }, b: { assists: number; }) => b.assists - a.assists);
                const top5Players = topPlayers.slice(0, 5);
                return {
                    ...currentState,
                    topPlayers: top5Players,
                };
            }
            break;

        case PlayersActionType.FetchTable:
            newState.table = action.payload;
            break;

        case PlayersActionType.FetchTableManchester:
            const sortedTable = action.payload.sort((a: { tablePosition: number; }, b: { tablePosition: number; }) => b.tablePosition - a.tablePosition);
            newState.table = sortedTable;
            break;


        case PlayersActionType.FetchTeamWinsTable:
            newState.result = action.payload;
            break;

        case PlayersActionType.DeletePlayer:
            const indexToDelete = newState.players.findIndex(t => t.playerId === action.payload)
            if (indexToDelete >= 0) {
                newState.players.splice(indexToDelete, 1)
            }
            break;
    }
    return newState;
}
export const playersStore = createStore(playersReducer);