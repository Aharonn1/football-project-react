import dataService from "../../../Services/DataService";
import appConfig from "../../../Utils/AppConfig";
import TeamModel from "../../../Models/TeamModel";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./Statistics.css";

const Statistics = () => {
    const [players, setPlayers] = useState<TeamModel[]>([]);

    useEffect(() => {
        dataService.getTopAssists()
            .then(table => setPlayers(table))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="Statistics">
            <h1>statistics
            </h1>
            <Table striped bordered hover >
                <thead>
                    <h1>TOP GOALSCORERS</h1>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Goals</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {players.sort((a, b) => b.goals - a.goals).map((t) =>
                        <tr key={t.playerId}>
                            <td>{t.firstName}</td>
                            <td>{t.lastName}</td>
                            <td>{t.goals}</td>
                            <td>
                                <img className="img" src={appConfig.playersImagesUrl + t.imageName} style={{ width: '50px' }} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Table striped bordered hover >
                <thead>
                    <h1>TOP Assists</h1>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Assists</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {players.sort((a, b) => b.assists - a.assists).map((t, index) =>
                        <tr key={t.playerId}>
                            <td>{t.firstName}</td>
                            <td>{t.lastName}</td>
                            <td>{t.assists}</td>
                            <td>
                                <img className="img" src={appConfig.playersImagesUrl + t.imageName} style={{ width: '50px' }} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}
export default Statistics;