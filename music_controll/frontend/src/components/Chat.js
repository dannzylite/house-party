import React, {useState, useEffect} from 'react'
import {Grid, Button, Typography} from '@material-ui/core'

export default function Chat(props) {
    const [message, sendMessage] = useState('')
    console.log(props)

    function handleMessage(e) {
        sendMessage(e.target.value)
    }

    return (
        <Grid container>
            <Grid item xs={1}>
                <Typography>
                    
                </Typography>
            </Grid>
            <form class="form">
                <input class="search__field" placeholder="Search over 1,000,000 recipes..." onChange={handleMessage}></input>
                <Button variant="contained" color="primary">Send</Button>
            </form>
        </Grid>
    )
    
}