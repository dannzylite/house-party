import React, {Component} from 'react'
import JoinRoom from "./JoinRoom"
import CreateRoom from "./CreateRoom"
import Room from "./Room"
import Info from "./Info"
import Chat from "./Chat"
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from "react-router-dom"
import {Grid, ButtonGroup, Button, Typography} from "@material-ui/core"

export default class HomePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            roomcode: null
        }
        this.clearState = this.clearState.bind(this)
        console.log(10)
    };

    async componentDidMount() {
        fetch('/api/userroom/').then(response => response.json()).then(data => {
            this.setState({
                roomcode: data.code
            })
        })
    }

    clearState() {
        this.setState({
            roomcode: null
        })
    }

    renderHomePage() {
        return (
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" component="h3">
                    House Party
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup>
                    <Button color="primary" variant="contained" to='/join' component={Link}>Join Room</Button>
                    <Button color="default" variant="contained" to='/info' component={Link}>Info</Button>
                    <Button color="secondary" variant="contained" to='/create' component={Link}>Create Room</Button>
                </ButtonGroup>
            </Grid>
        </Grid>)
    }
    render() {
        return (<Router>
                    <Switch>
                        <Route exact path='/' render={() => {
                            return this.state.roomcode ? (<Redirect to={`/room/${this.state.roomcode}`}/>) :
                             (this.renderHomePage())
                        }} />
                        <Route path='/join' component={JoinRoom} />
                        <Route path='/info' component={Info} />
                        <Route path='/create' component={CreateRoom} />
                        <Route path='/chat' component={Chat} />
                        <Route path='/room/:roomCode' render={(props) => {
                            return <Room {...props} leaveCallBack={this.clearState}/>
                        }} />
                    </Switch>
            </Router>)
    }
}