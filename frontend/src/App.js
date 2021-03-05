import React from 'react';
import './App.css';
import MicRecorder from 'mic-recorder-to-mp3';
import axios from 'axios';

const Mp3Recorder = new MicRecorder({bitRate: 256})
const flaskEndpoint = "https://pod1out.ie/backend";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isRecording: false,
            blobURL: '',
            isBlocked: false,
            recorded:false
        }
    }

    start = () => {
        if(this.state.isBlocked){
            console.log('Permission Denied');
        } else {
            Mp3Recorder.start().then(() => {
                this.setState({isRecording: true});
            }).catch((e) => console.error(e));
            }
        };

    stop = () => {
        Mp3Recorder
            .stop()
            .getMp3().then(([buffer, blob]) => {
            const blobURL = URL.createObjectURL(blob);
            this.setState({blobURL, isRecording: false, recorded:true})
        });
    };

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({audio: true},
            ()=> {
                console.log('Permission Granted');
                this.setState({isBlocked:false});
            },
            ()=> {
                console.log('Permission Denied');
                this.setState({isBlocked:true});

            }
        );

        axios.get(flaskEndpoint + '/')
            .then(res => {
                const persons = res.data;
                console.log(persons);
            })
    }

    render() {
        return(
            <div className="App">
                <div className="container">
                    <nav className="navbar navbar-inverse">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="#">WebSiteName</a>
                            </div>
                            <ul className="nav navbar-nav">
                                <li className="active"><a href="#">Home</a></li>
                                <li><a href="#">Page 1</a></li>
                                <li><a href="#">Page 2</a></li>
                                <li><a href="#">Page 3</a></li>
                            </ul>
                        </div>
                    </nav>
                    <div className="row">
                        <div id = "left" className="col-xs-10">
                            <header className="App-Header">
                                <button onClick={this.start} disabled={this.state.isRecording}>Record</button>
                                <button onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
                                <audio src={this.state.blobURL} controls = "controls"/>
                            </header>
                            <header>
                                <button disabled={this.state.recorded}>Push Audio</button>
                                <button>Pull Audio</button>
                                <audio controls = "controls"/>
                            </header>
                        </div>
                        <div id = "right" className="col-xs-2">
                            TWO
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
