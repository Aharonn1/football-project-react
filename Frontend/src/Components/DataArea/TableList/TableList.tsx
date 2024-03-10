import { SetStateAction, useEffect, useState } from "react";
import dataService from "../../../Services/DataService";
import TableModel from "../../../Models/TableModel";
import TeamModel from "../../../Models/TeamModel";
import appConfig from "../../../Utils/AppConfig";
import Table from 'react-bootstrap/Table';
import "./TableList.css";

function TableList(): JSX.Element {

    const [players, setPlayers] = useState<TeamModel[]>([]);
    const [table, setTable] = useState<TableModel[]>([]);
    const [winners, setWinners] = useState([]);
    const [losers, setLosers] = useState([]);

    useEffect(() => {
        dataService.getManchesterResult()
            .then(table => setTable(table))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        dataService.getTheTable()
            .then(table => setTable(table))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        dataService.getTopGoalScorers()
            .then(table => setPlayers(table))
            .catch(err => console.log(err));
    }, []);

    const handleClick = () => {
        let winners: SetStateAction<any[]> = [];
        let losers: SetStateAction<any[]> = [];
        dataService.getTheResult();
        setWinners(winners);
        setLosers(losers);
    };

    return (
        <div className="TableList">
            <button onClick={handleClick}>התחל</button>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Place</th>
                        <th>Name</th>
                        <th>Games</th>
                        <th>Wins</th>
                        <th>Loses</th>
                        <th>Draw</th>
                        <th>Points</th>
                        <th>Image</th>
                        <th>Last Games</th>

                    </tr>
                </thead>
                <tbody>
                    {table.sort((a, b) => b.points - a.points).map((t, index) =>
                        <tr key={t.teamId}>
                            <td>{index + 1}</td>
                            <td>{t.name}</td>
                            <td>{t.games}</td>
                            <td>{t.wins}</td>
                            <td>{t.loses}</td>
                            <td>{t.draw}</td>
                            <td>{t.points}</td>
                            <td>
                                <img className="img" src={appConfig.playersImagesUrl + t.imageName} style={{ width: '20px' }} />
                            </td>
                            <td>{t.lastGames}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}
export default TableList;