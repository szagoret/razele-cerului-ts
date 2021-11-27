import {SongType} from "../../pages/cuprins";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Stanza from "./Stanza";

type SongProps = {
    song: SongType
};
const Song = ({song}: SongProps) => {

    return (
        <Typography variant="body2" sx={{whiteSpace: 'pre-wrap'}}>
            {
                song.stanzas.map((stanza, i) => (
                    <Stanza stanza={stanza} key={i}/>
                ))
            }
        </Typography>
    );
};

export default Song;