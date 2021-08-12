import React from 'react'
import Raphael from '../imgs/Raphael.png'
import Leonardo from '../imgs/Leonardo.png'
import Donatello from '../imgs/Donatello.png'
import Michelangelo from '../imgs/Michelangelo.png'

function getAvatar(location) {
  switch(location) {
      case "/Leonardo.png":
          return Leonardo;
      case "/Donatello.png":
            return Donatello;
      case "/Michelangelo.png":
        return Michelangelo;
      default:
          return Raphael;
  }
}

const EpisodeInList = (props) => {
    const row = (
        <tr>
            <td><img className="profile_image" src ={getAvatar(props.avatar)}/></td>
            <td><h5>{props.name}</h5></td>
            <td><button className = "button" onClick={props.Button}>Invite</button></td>
            <hr/>
        </tr>);

    return row;
}

export default EpisodeInList;
