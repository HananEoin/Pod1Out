import React from "react";

const AudioInList = (props) => {
    const row = (
        <tr>
            <td>{props.name}</td>
            <td><a href={props.downloadLink} className = "button"  download>Download</a></td>
            <hr/>
        </tr>);

    return row;
}

export default AudioInList;
