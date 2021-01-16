import React, {useState, useEffect} from 'react'
import {Grid, Typography, IconButton, Button} from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import {Link} from 'react-router-dom'

const pages = {
    Join: 'pages.join',
    Create: 'pages.create'
}

export default function Info(props) {
    const [page, setPage] = useState(pages.Join)
    console.log(props)

    function join() {
        return 'Join Page'
    }

    function create() {
        return 'Create Page'
    }
    return (
        <Grid container spacing= {1}>
            <Grid item xs={12} align="center">
                <Typography container="h4" variant="h4">
                    What is House Party?
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="body1">
                    {page === pages.Join ? join() : create()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <IconButton onClick={() => {page === pages.Join ? setPage(pages.Create) : setPage(pages.Join)}}>
                {page === pages.Join ? <NavigateNextIcon/> : <NavigateBeforeIcon/>}
                </IconButton>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" to='/' component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}