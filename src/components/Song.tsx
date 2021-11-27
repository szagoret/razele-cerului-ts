import {SongType} from "../../pages/cuprins";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Stanza from "./Stanza";

type SongProps = {
    song: SongType
};
const Song = ({song}: SongProps) => {

    return (
        <Card sx={{minWidth: 400, maxWidth: 500}} elevation={0}>
            <CardContent>
                <Typography variant="body2" sx={{whiteSpace: 'pre-wrap'}}>
                    {
                        song.stanzas.map((stanza, i) => (
                            <Stanza stanza={stanza} key={i}/>
                        ))
                    }
                </Typography>
            </CardContent>

        </Card>
    );
};

export default Song;