import React, {Component} from 'react'
import {Grid, Typography, Button, Card, LinearProgress, IconButton} from "@material-ui/core"
import {Link} from 'react-router-dom'
import CreateRoom from './CreateRoom'
import Chat from './Chat'
import MusicPlayer from './MusicPlayer'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import SkipNextIcon from '@material-ui/icons/SkipNext'

export default class Room extends Component {
    constructor(props){
        super(props)
        this.state = {
            voteToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
            isAuthenticated: false,
            song: {},
        }
        this.roomCode = this.props.match.params.roomCode
        console.log(this.props)
        this.LeaveButtonPress = this.LeaveButtonPress.bind(this)
        this.updateSettings = this.updateSettings.bind(this)
        this.renderSettings = this.renderSettings.bind(this)
        this.renderSettingButton = this.renderSettingButton.bind(this)
        this.updateRoom = this.updateRoom.bind(this)
        this.authenticateSpotify = this.authenticateSpotify.bind(this)
        this.getCurrentSong = this.getCurrentSong.bind(this)
        this.updateRoom()
        this.getCurrentSong()
    }
    componentDidMount() {
        this.interval = setInterval(this.getCurrentSong, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }
    updateSettings(value) {
        this.setState({
            showSettings: value
        })
    }
    updateRoom() {
        fetch('/api/getroom/'+ '?code=' + this.roomCode).then(response => {
            if(!response.ok){
                console.log(5)
                this.props.leaveCallBack()
                this.props.history.push('/')
            }
        return response.json()
        }).then(data => {
            this.setState({
                voteToSkip: data.vote_to_skip,
                guestCanPause: data.guess_can_pause,
                isHost: data.isHost
            })
        if (this.state.isHost){
         this.authenticateSpotify()
        }
        })
    }

    authenticateSpotify() {
        console.log(5)
        fetch('/spotify/is-authenticated/').then(response => response.json()).then(data => {
            this.setState({
                isAuthenticated: data.status
            })
            if (! data.status){
                fetch('/spotify/get-auth-url/').then(response => response.json()).then(data => {
                    window.location.replace(data.url)
                })
            }
        })
    }

    getCurrentSong() {
        fetch('/spotify/current-song/').then(response => {
            if (!response.ok) {
                return {}
            }else{
                return response.json()
            }
        }).then((data) => {
            this.setState({ song: data })
            console.log(this.state.song)
        })
    }

    LeaveButtonPress() {
        const req = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }
        fetch('/api/leaveroom/',req).then(response => {
            console.log(6)
            this.props.leaveCallBack()
            this.props.history.push('/')
        })
    }

    renderSettingButton() {
        return ( <Grid item xs={12} align="center">
            <Button color="primary" variant="contained" onClick={() => this.updateSettings(true)}> Settings </Button>
        </Grid>)
            
    }


    renderSettings() {
        return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <CreateRoom 
                    update={true}
                    guestcanpause = {this.state.guestCanPause}
                    votetoskip = {this.state.voteToSkip}
                    roomCode = {this.roomCode}
                    UpdateCallBack = {this.updateRoom}
                    />
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" onClick={() => this.updateSettings(false)}>
                    Close
                </Button>
            </Grid>
        </Grid>)
    }

    render() {
        const songProgress = (this.props.time / this.props.duration) * 100
        if(this.state.showSettings){
            return this.renderSettings()
        }
        return (<Grid container spacing={1}>
            <Grid item xs={2} align="center">
                <Button variant="contained" color="primary" onClick={() => {
                    this.props.history.push('/chat/')}}>
                    Chat
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    {this.roomCode}
                </Typography>
            </Grid>
            <MusicPlayer {...this.state.song}/>
            {this.state.isHost ? this.renderSettingButton() : null}
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" onClick={this.LeaveButtonPress}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>)
    }
}

/*
<div>
            <h3>{this.roomCode}</h3>
            <p>Votes: {this.state.voteToSkip}</p>
            <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
            <p>isHost: {this.state.isHost.toString()}</p>
        </div>*/