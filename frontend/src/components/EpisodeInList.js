import React from 'react';

const EpisodeInList = (props) => {
    const row = (
        <tr>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.record_date}</td>
            <td>{props.participants}</td>
            <td><button className = "button" onClick={props.selectButton}>Select</button></td>
            <hr/>
        </tr>);

    return row;
}

export default EpisodeInList;
