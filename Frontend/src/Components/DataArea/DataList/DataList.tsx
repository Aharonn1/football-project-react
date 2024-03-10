import dataService from "../../../Services/DataService";
import TableModel from "../../../Models/TableModel";
import TeamModel from "../../../Models/TeamModel";
import DataCard from "../DataCard/DataCard";
import { useState, useEffect } from "react";
import "./DataList.css";

function DataList(): JSX.Element {

    const [players, setPlayers] = useState<TeamModel[]>([]);
    const [table, setTable] = useState<TableModel[]>([]);
    const [text, setText] = useState<string>('');

    useEffect(() => {
        dataService.getTheTable()
            .then(table => setTable(table))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        dataService.getAllPlayers()
            .then(task => setPlayers(task))
            .catch(err => console.log(err))
    }, [])

    const totalPrice = players.reduce((acc, player) => acc + player.price, 0);
    const averageAge = players.reduce((acc, player) => acc + player.age, 0) / players.length;
    const position = table.findIndex((table => table.name === "Manchester United")) + 1;

    const search = () => {
        const findTasks =
            players && players?.length > 0 ? players?.filter((s) => s?.firstName + " " + s?.lastName === text) : undefined
        setPlayers(findTasks)
    }

    return (
        <div className="DataList box">
            <div className="row row-cols-1 row-cols-md-6 g-4 wrapper">
                <div className="input_wrapper">
                    <input type="text" placeholder="search task" value={text}
                        onChange={(e) => { setText(e.target.value); }} />
                    <button disabled={!text} onClick={search}>search</button>
                    {players && players?.length === 0 && (
                        <div className="notFound">The task is not found</div>
                    )}
                </div>
                <h3 style={{ color: 'blue' }} >Total Market Value = ${totalPrice.toFixed()}M</h3>
                <h3 style={{ color: 'blue' }} >Average Age = {averageAge.toFixed()}</h3>
                <h3 style={{ color: 'blue' }} >Table Position = {position.toFixed()}</h3>
                <br />
                {players.map((item) => <DataCard key={item.playerId} player={item} />)}
                <br />
            </div>
        </div>
    );
}
export default DataList;