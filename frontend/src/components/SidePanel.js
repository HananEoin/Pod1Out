import React, { useState, useEffect} from "react";
import axios from "axios";
import SquadInList from "./SquadInList";
import FriendInList from "./FriendInList";
import {useAppContext} from "../AppContext";

// const flaskEndpoint = "https://pod1out.ie/backend";
const flaskEndpoint = "http://127.0.0.1:5000/";


const SidePanel = ({setActive}) => {
    const { user } = useAppContext();
    const [friends, setFriends] = useState([]);
    const [squads, setSquads] = useState([]);
    const [friendsFetchError, setFriendsFetchError] = useState(false);
    const [squadsFetchError, setSquadsFetchError] = useState(false);


    useEffect(() => {
        getFriends()
        getSquads()
    }, [user])


    const getFriends = () => {
        setFriendsFetchError(false);
        let url = flaskEndpoint + "friends/" + user.id.toString();

        axios.get(url)
            .then(response => {
                setFriends(response.data.users)
            }
            )
            .catch(error => {
                console.log("Friend Fetch Error: " + error)
                setFriendsFetchError(true);
            })
    }

    const getSquads = () => {
        let url = flaskEndpoint + "squads/" + user.id.toString();

        axios.get(url)
            .then(response => {
                setSquads(response.data.squads)
            })
            .catch(error => {
                console.log("Squad Fetch Error: " + error)
                setSquadsFetchError(true)
            })
    }

    return(
        <div id="friends-list">
            <div className="jumbotron">
                <button className='button' onClick={() => setActive("Record")}>Start Party</button>
                <hr/>
                Friends List
            </div>
            <FriendsList friends={friends} error={friendsFetchError}/>

            <div className="jumbotron">
                Squads List
            </div>
            <SquadsList squads={squads} error={squadsFetchError}/>

        </div>
    )

}

const FriendsList = ({friends, error}) => {
    let friendsData = <tr>Unable to fetch friends</tr>;

    function inviteFriend(id) {
        //TODO NEXT SPRINT
    }

    if (!error) {
        friendsData = friends.map(friend => {
            return <FriendInList
                key={friend.id}
                avatar={friend.location}
                name={friend.name}
                inviteButton={() => inviteFriend(friend.id)}
            />
        })
    }
    return(
        <ul>
            {friendsData}
        </ul>
    )
}

const SquadsList = ({squads, error}) => {

    let squadsData = <tr>Unable to fetch squad</tr>;

    function inviteSquad(id) {
        //TODO NEXT SPRINT
    }

    if (!error) {
        squadsData = squads.map(squad => {
            return <SquadInList
                key={squad.id}
                location={squad.location}
                name={squad.name}
                inviteButton={() => inviteSquad(squad.id)}
            />
        })
    }
    return(
        <ul>
            {squadsData}
        </ul>
    )
}

export default SidePanel;

