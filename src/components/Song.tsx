import * as React from "react";
import Stanza from "./Stanza";
import {SongType} from "src/song";
import {Box} from "@mui/material";

type SongProps = {
    song: SongType
};
const Song = ({song}: SongProps) => {

    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            {
                song.stanzas.map((stanza, i) => (
                    <Stanza stanza={stanza} key={i}/>
                ))
            }
        </Box>
    );
};

export default Song;