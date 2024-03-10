import Statistics from "../../DataArea/Statistics/Statistics";
import TableList from "../../DataArea/TableList/TableList";
import { Navigate, Route, Routes } from "react-router-dom";
import DataList from "../../DataArea/DataList/DataList";
import PageNotFound from "../PageNotFound/PageNotFound";
import Scoreboard from "../../DataArea/Scoreboard/Scoreboard";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/list" element={<DataList />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/scoreboard" element={<Scoreboard />} />
            <Route path="/table" element={<TableList />} />
            <Route path="/" element={<Navigate to="/list" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}
export default Routing;