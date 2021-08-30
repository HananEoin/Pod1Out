import React from 'react';

const EpisodeInList = (props) => {
    const row = (
        <tr>
            <td>{props.id}</td>
            <td>{props.record_date}</td>
            <td>{props.length}</td>
            <td><button className = "button" onClick={props.selectButton}>Select</button></td>
            <hr/>
        </tr>);

    return row;
}

export default EpisodeInList;
