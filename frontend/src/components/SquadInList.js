import tmnt from "../imgs/tmnt.png";
import React from "react";

const SquadInList = (props) => {
    const row = (
        <tr>
            <td><img className="profile_image" src ={tmnt}/></td>
            <td><h3>{props.name}</h3></td>
            <td><button className = "button" onClick={props.Button}>Invite</button></td>
        </tr>);

    return row;
}

export default SquadInList;
