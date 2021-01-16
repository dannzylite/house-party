import React, {Component} from 'react'
import {Grid, Button, Typography, TextField} from "@material-ui/core"
import {Link} from "react-router-dom"

export default class JoinRoom extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: "",
            roomcode:""
        }
        this.handleTextField = this.handleTextField.bind(this)
        this.handleClick = this.handleClick.bind(this)
    };
    render() {
        return <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant='h4' component="h4">
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField
                error=""
                label="code"
                placeholder="Enter your Code"
                value={this.state.roomcode}
                helperText={this.state.error}
                variant="outlined"
                onChange={this.handleTextField}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={this.handleClick}>
                    Join Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to='/' component={Link}>
                        Back
                    </Button>
            </Grid>

        </Grid>
    }
    handleTextField(e) {
        this.setState({
            roomcode: e.target.value
        })
    }
    handleClick(e) {
        const reqOtp = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                code: this.state.roomcode
            })
        }
        fetch('/api/joinroom/', reqOtp).then(response => {
            if(response.ok){
                this.props.history.push(`/room/${this.state.roomcode}`)
            }else{
                this.setState({
                    error:'wrong Code'
                })
            }
        })
    }
}