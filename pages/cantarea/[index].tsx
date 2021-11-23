import database from '../../db/database.json';
import {find} from 'lodash';
import {GetStaticProps} from "next";
import {SongPropType} from "../cuprins";
import {AppBar, Container, IconButton, Toolbar, Typography} from "@mui/material";
import Song from "../../src/components/Song";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SlideShowSong from "../../src/components/SlideShowSong";
import * as React from "react";
import {useState} from "react";
import SlideshowIcon from '@mui/icons-material/Slideshow';
import Link from '../../src/components/Link';
import TocIcon from '@mui/icons-material/Toc';

const Index = ({song}: SongPropType) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense" sx={{display: 'flex', justifyContent: 'center'}}>
                    <MusicNoteIcon/>
                    <Typography variant="h6" color="inherit" component="div">
                        {`${song.index} ${song.title}`}
                    </Typography>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ml: 2}}
                                onClick={() => setOpen(true)}>
                        <SlideshowIcon fontSize={"large"}/>
                    </IconButton>
                    <Link href="/cuprins" sx={{color: "#fff", paddingTop: '8px'}} passHref>
                        <TocIcon fontSize={"large"}/>
                    </Link>
                </Toolbar>
            </AppBar>
            <Container sx={{p: 3, display: "flex", justifyContent: "center"}}>
                <Song song={song}/>
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
    console.log(params);
    return ({props: {song: find(database, ["index", parseInt(params?.index as string)])}});
};