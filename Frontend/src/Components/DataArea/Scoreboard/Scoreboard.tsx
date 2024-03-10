import dataService from "../../../Services/DataService";
import TableModel from "../../../Models/TableModel";
import appConfig from "../../../Utils/AppConfig";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./Scoreboard.css";

function Scoreboard(): JSX.Element {

    const [table, setTable] = useState<TableModel[]>([]);
    const [awayTeam, setAwayTeam] = useState<TableModel[]>([]);
    const [homeTeam, setHomeTeam] = useState<TableModel[]>([]);

    useEffect(() => {
        dataService.getAwayTeam()
            .then(table => setAwayTeam(table))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        dataService.getHomeTeam()
            .then(table => setHomeTeam(table))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        dataService.getManchesterResult()
            .then(table => setTable(table))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="Scoreboard">
            <div className="tables-container">
                <Table  >
                    <thead>
                        <tr>
                            <th>קבוצה חוץ</th>
                            <th>תוצאה</th>
                        </tr>
                    </thead>
                    <tbody >
                    {awayTeam.filter((team => team.goals >= 3))                            
                    .map((winner) =>
                    <tr key={winner.teamId}>
                                <td><img className="img" src={appConfig.playersImagesUrl + winner.imageName} style={{ width: '15px' }} />
                                    {winner.name}
                                </td>
                                <td>{winner.goals}</td>
                            </tr>)}
                    </tbody>
                </Table>
                <Table  >
                    <thead>
                        <tr>
                            <th>תוצאה</th>
                            <th>קבוצה בית</th>
                        </tr>
                    </thead>
                    {homeTeam.filter((team => team.goals < 3))
                        .map((winner, ) =>
                            <tr key={winner.teamId}>
                                <td>{winner.goals}</td>
                                <td>{winner.name} <img className="img" src={appConfig.playersImagesUrl + winner.imageName} style={{ width: '15px' }} />
                                </td>
                            </tr>)}
                </Table>
            </div>
        </div>
    );
}
export default Scoreboard;