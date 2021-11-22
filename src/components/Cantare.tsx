import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'

// @ts-ignore
const Cantare = ({song}) => {

    return (
        <Card sx={{minWidth: 275}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {song.index} {song.title}
                </Typography>
                <Typography variant="body2" sx={{whiteSpace: 'pre-wrap'}}>
                    {song.lyrics}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Cantare;