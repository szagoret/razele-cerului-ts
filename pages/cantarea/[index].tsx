import database from '../../db/database.json';
import {find, sortBy} from 'lodash';
import {GetStaticProps} from "next";
import {SongType} from "../cuprins";
import {Container, Grid, Typography} from "@mui/material";
import Song from "../../src/components/Song";
import SlideShowSong from "../../src/components/SlideShowSong";
import * as React from "react";
import {useState} from "react";
import {useRouter} from "next/router";
import SongAppBar from "../../src/components/SongAppBar";

const Index = ({song, songs}: { song: SongType, songs: Array<{ index: number, title: string }> }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    return (
        <>
            <SongAppBar songs={songs}/>
            <Container sx={{p: 3, display: "flex", justifyContent: "center", flexDirection: 'column'}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant={"h6"}
                                    align={"center"}
                                    sx={{
                                        borderBottom: "1px solid",
                                        borderColor: '#dfdfdf',
                                        color: '#4c4c4c'
                                    }}>
                            {`${song.index}. ${song.title}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Song song={song}/>
                    </Grid>
                </Grid>
                <SlideShowSong song={song} open={open} handleClose={() => setOpen(false)}/>
            </Container>
        </>
    );
};

export default Index;

export const getStaticPaths = () => {
    const paths = database.map(song => ({
        params: {index: String(song.index)}
    }));
    return ({
        paths: paths,
        fallback: false
    });
};

export const getStaticProps: GetStaticProps = ({params}) => {
    return ({
        props: {
            song: find(database, ["index", parseInt(params?.index as string)]),
            songs: sortBy(database.map((song) => ({
                index: song.index,
                title: `${song.index}. ${song.title}`
            })), ["index"]),
        }
    });
};