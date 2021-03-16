import React, { useState, useEffect } from 'react'
import axios from "axios";
import EpisodeInList from "./EpisodeInList";
import ReactAudioPlayer from 'react-audio-player';
import AudioInList from "./AudioInList";
import {useAppContext} from "../AppContext";

// const flaskEndpoint = "https://pod1out.ie/backend";
const flaskEndpoint = "http://127.0.0.1:5000/";


const EpisodesPanel = () => {

    const { user, episodeId, setEpisode } = useAppContext();
    const [episodes, setEpisodes] = useState([]);
    const [audios, setAudios] = useState([]);
    const [audioFetchError, setAudioFetchError] = useState(false);
    const [episodeFetchError, setEpisodeFetchError] = useState(false)


    useEffect(() => {
        getEpisodes();

    }, [user])

    useEffect(() => {
        if (episodeId) {
            getAudio();
            getEpisode();
        }

    }, [episodeId])


    const getEpisodes = () => {
        setEpisodeFetchError(false);

        let url = `${flaskEndpoint}episodes/${user.id}`

        axios.get(url)
            .then(response => {
                setEpisodes(response.data.episodes);
            })
            .catch(error => {
                console.log("Episode Fetch Error: " + error)
                setEpisodeFetchError(true);
            });
    };

    const getAudio = () => {
        let url = `${flaskEndpoint}episode/audio/${episodeId}`;
        axios.get(url)
            .then(response => {
                setAudios(response.data.audio)
                console.log(response.data.audio)
            })
            .catch(error => {
                console.log("Audio Fetch Error: " + error)
                setAudioFetchError(true);
            })
    }

    const getEpisode = () => {
        let url = `${flaskEndpoint}episode/${episodeId}`;
        axios.get(url)
            .then(response => {
                console.log({ data: response.data });
                setEpisode(response.data.episode)
            })
            .catch(error => {
                console.log("Episode Fetch Error: " + error)

            })
    }


        return(
            <div>
                <div className="top">
                    <EpisodesList episodes={episodes} error={episodeFetchError}/>
                </div>
                <div className="row">
                    <div className="left">
                        <EpisodePlayer />
                    </div>
                    <div className="right">
                        <AudioList audios={audios} error={audioFetchError}/>
                    </div>
                </div>
            </div>
        )
}


const EpisodesList = ({ episodes, error }) => {
   const { setEpisodeId } = useAppContext();

    let episodeTableData = <tr>Unable to fetch Audio Files</tr>;


    if (!error) {
        episodeTableData = episodes.map(episode => {
            return <EpisodeInList
                key={episode.id}
                id={episode.id}
                name={episode.name}
                record_date={episode.record_date}
                participants={episode.participants}
                selectButton={() => setEpisodeId(parseInt(episode.id))}
            />
        })
    }
    return(
        <table className="table" id="episodes-table">
            <thead>
            <tr>
                <th scope="col" >Episode Number</th>
                <th scope="col" >Name</th>
                <th scope="col" >Record Date</th>
                <th scope="col" >Participant Number</th>
                <th scope="col">Select</th>
            </tr>
            </thead>
            <tbody>
                {episodeTableData}
            </tbody>
        </table>
    )
}


const EpisodePlayer = () => {
    const { episode } = useAppContext();
    console.log({episode});

    if (episode && episode.id) {
        return (
            <div>
                <div className="jumbotron">Episode Player</div>
                <div className="player">
                    <h1>{episode.name}</h1>
                    <ReactAudioPlayer
                        src={episode.file_location}
                        controls
                    />
                </div>

            </div>
        )
    }

    return (
        <div>
            <div className="jumbotron">Episode Player</div>
            <div className="player">
                <h1>No Episode selected</h1>

                <ReactAudioPlayer
                    controls
                />
            </div>

        </div>
    )
}

const AudioList = ({ audios, error }) => {

    function downloadAudio(id) {
        //TODO Next Sprint
        // Make Downloads happen
        // getAudio(id);
    }


    return(
        <div>
            <div className="jumbotron" id = "AudioTron">Audio Downloads</div>
            <table className="table" id="audio-table">
                <thead>
                <tr>
                    <th scope="col" >Participant</th>
                    <th scope="col">Download</th>
                </tr>
                </thead>
                <tbody>
                    {error && <tr>Unable to fetch Audio files</tr>}
                    {!error && audios.map(audio => {
                        console.log(audio);
                        return <AudioInList
                            key={audio.id}
                            name={audio.name}
                            selectButton={() => downloadAudio(audio.file_location)}
                        />
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default EpisodesPanel;


