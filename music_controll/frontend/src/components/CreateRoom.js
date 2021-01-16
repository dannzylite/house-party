import React, {Component} from 'react'
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import FormHelperText from "@material-ui/core/FormHelperText"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Radio from "@material-ui/core/Radio"
import { Link } from "react-router-dom"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import {Collapse} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

export default class CreateRoom extends Component {
    static defaultProps = {
        guestcanpause: true,
        votetoskip: 2,
        update: false,
        roomCode: null,
        UpdateCallBack: () => {}
    }
    constructor(props){
        super(props)
        this.state = {
            guestcanpause: this.props.guestcanpause,
            votetoskip: this.props.votetoskip,
            success: "",
            error: ""
        }
        console.log(this.props)
        this.handleButtonPressed = this.handleButtonPressed.bind(this)
        this.handleVoteToSkip = this.handleVoteToSkip.bind(this)
        this.handleGuestCanPause = this.handleGuestCanPause.bind(this)
        this.handleUpdateButton = this.handleUpdateButton.bind(this)
    };

    handleVoteToSkip(e) {
        this.setState({
            votetoskip: e.target.value
        })
    }
    handleGuestCanPause(e) {
        this.setState({
            guestcanpause: e.target.value === 'true' ? true : false
        })
    }
    handleButtonPressed() {
        const requestOpt = {
            method: 'POST',
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({
                vote_to_skip: this.state.votetoskip,
                guess_can_pause: this.state.guestcanpause
            })
        }
        fetch('/api/create/',requestOpt).then(response => response.json()).then(data => this.props.history.push('/room/' + data.code))
    }
    handleUpdateButton() {
        const requestOpt = {
            method: 'PATCH',
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({
                vote_to_skip: this.state.votetoskip,
                guess_can_pause: this.state.guestcanpause,
                code: this.props.roomCode
            })
        }
        fetch('/api/updateroom/',requestOpt).then(response => {
            if(response.ok) {
                this.setState({
                    success:"You have updated sucessfully"
                })
            }else {
                this.setState({
                    error:"error in updating"
                })
            }
            this.props.UpdateCallBack()
        })
    }
    CreateButton() {
        return (<Grid container spacing={1}>
            <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" onClick={this.handleButtonPressed}>
            Create A Room
        </Button>
    </Grid>
    <Grid item xs={12} align="center">
        <Button color="Secondary" variant="contained" to="/" component={Link}>
            Back
        </Button>
    </Grid>
    </Grid>)
    }
    UpdateButton() {
        return (<Grid container spacing={1}>
            <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" onClick={this.handleUpdateButton}>
            Update Room
        </Button>
    </Grid>
    </Grid>)
    }
    render() {
        const title = this.props.update ? 'Update Room' : 'Create a Room'
        return <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Collapse in={this.state.success != "" || this.state.error != ""}>
                    {this.state.success != "" ? (<Alert severity="success" onClose={() => this.setState({
                        success: ""
                    })}>{this.state.success}</Alert>) : 
                    (<Alert severity="error" onClose={() => this.setState({
                        success: ""
                    })}>{this.state.error}</Alert>)}
                </Collapse>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">
                            Guest Control Of Playback State
                        </div>
                    </FormHelperText>
                    <RadioGroup row defaultValue={this.props.guestcanpause.toString()} onChange={this.handleGuestCanPause}>
                        <FormControlLabel value='true' 
                                control={<Radio color="primary"/>}
                                label="play/pause"
                                labelPlacement="bottom">
                        </FormControlLabel>
                        <FormControlLabel value='false' 
                                control={<Radio color="secondary"/>}
                                label="No Control"
                                labelPlacement="bottom">
                        </FormControlLabel>
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField required={true} type="number" onChange={this.handleVoteToSkip} defaultValue={this.state.votetoskip}
                    inputProps={{
                        min:1,
                        style: {textAlign:"center"}
                    }}/>
                    <FormHelperText>
                        <div align="center">
                            Vote Required To Skip Song
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            {this.props.update ? this.UpdateButton() : this.CreateButton()}
        </Grid>
    }
}