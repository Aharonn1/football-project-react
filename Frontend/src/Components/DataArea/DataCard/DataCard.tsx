import TeamModel from "../../../Models/TeamModel";
import config from "../../../Utils/AppConfig";
import "./DataCard.css";

interface TaskCardProps {
    player: TeamModel,
}

function DataCard(props: TaskCardProps): JSX.Element {

    return (
        <div className="DataCard Box">
            <div className="card-image">
                <img className="img" src={config.playersImagesUrl + props.player.imageName} />
            </div>
            <span>  First Name: {props.player.firstName} </span>
            <br />
            <span>  Last Name: {props.player.lastName} </span>
            <br />
            <span>  Role: {props.player.role} </span>
            <br />
            <span>  Number Shirt: {props.player.numberShirt} </span>
            <br />
        </div >
    );
}
export default DataCard;