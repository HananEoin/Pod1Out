import React from 'react';
import AuthApi from "../AuthApi";
import red_light from "../imgs/red.png"
import green_light from "../imgs/green.png"
import MicRecorder from "mic-recorder-to-mp3";
import axios from "axios";

// const flaskEndpoint = "https://pod1out.ie/backend";
const flaskEndpoint = "http://127.0.0.1:5000/";

const Mp3Recorder = new MicRecorder({bitRate: 256})

class RecordPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRecording: false,
            isReady: false,
            blobURL: '',
            isBlocked: false,
            recorded:false,
            readyText: 'Ready',
            light: red_light
        }
    }

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({audio: true},
            () => {
                console.log('Permission Granted');
                this.setState({isBlocked: false});
            },
            () => {
                console.log('Permission Denied');
                this.setState({isBlocked: true});

            }
        );
    }

    //TODO NEXT SPRINT
    // Make Ready up functionality in party
    readyUp(){
        console.log("Swapping")

        if(!this.state.isReady) {
            this.setState({light: green_light})
            this.setState({isReady: true})
            this.setState({readyText: 'Unready'})
        }
        else{
            this.setState({light: red_light})
            this.setState({isReady: false})
            this.setState({readyText: 'Ready'})
        }
    }

    startRecording() {
        if(this.state.isBlocked){
            console.log('Permission Denied');
        } else {
            Mp3Recorder.start().then(() => {
                this.setState({isRecording: true});
            }).catch((e) => console.error(e));
        }
    }

    stopRecording() {
        Mp3Recorder
            .stop()
            .getMp3().then(([buffer, blob]) => {
            console.log(buffer, blob);

            const audio_file = new File(buffer, 'recording.mp3', {
                type: blob.type,
                lastModified: Date.now()
            });


            const blobURL = URL.createObjectURL(blob);
            this.setState({blobURL, isRecording: false, recorded:true})

            convertBlobToBase64(blob).then(data64 => {

                const data = new FormData();
                data.append("audio", audio_file, audio_file.name);

                let options = {
                    method: 'POST',
                    data,
                    url: flaskEndpoint + "audio",
                    crossOrigin:'*',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    json: true
                }

                console.log(options)

                axios(options)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log("Error in the axios call:" + error);
                    })
            }).catch(error => {
                console.log("blob error", error);
            });



        });

        //TODO send to server
    }

    render(){
        return(
            <div>
                <div className="top">
                    <Party/>
                </div>
                <div className="row">
                    <div className="left">
                        <div className="record_left">
                            <ul className="button_list">
                                <li><button className="button" onClick={() => this.readyUp()}>Wrong</button></li>
                                <li><button className="button" onClick={() => this.startRecording()} disabled={this.state.isRecording}>Wrong</button></li>
                                <li><button className="button" onClick={() => this.stopRecording()} disabled={!this.state.isRecording}>Wrong</button></li>
                            </ul>
                            <h1>Playback:</h1>
                            <audio src={this.state.blobURL} controls="controls"/>
                        </div>
                        <div className="record_right">
                            <img className="light" src={this.state.light}/>
                        </div>
                    </div>
                    {/*<div className="right">*/}
                    {/*    <Notes/>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}



const Party = () => {
    const Auth = React.useContext(AuthApi)

    //TODO NEXT SPRINT
    //Stop hardcoding values
    let partyData = <tr>
        <td scope="col" >Leonardo</td>
        <td scope="col" >Leader</td>
        <td scope="col" >Recording</td>
    </tr>


    return (
        <table className="table" id="episodes-table">
            <thead>
            <tr>
                <th scope="col" >Name</th>
                <th scope="col" >Role</th>
                <th scope="col" >Status</th>

            </tr>
            </thead>
            <tbody>
                {partyData}
            </tbody>
        </table>
    )
}

const convertBlobToBase64 = blob => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});


export default RecordPanel;
