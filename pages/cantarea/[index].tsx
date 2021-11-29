import database from '../../db/db-2021.json';
import {find, sortBy} from 'lodash';
import {GetStaticProps} from "next";
import {Container, Grid, Typography} from "@mui/material";
import Song from "../../src/components/Song";
import React, {useState} from "react";
import {SongType} from "../../song";
import Layout from "../../src/components/Layout";

const Index = ({song, songs}: { song: SongType, songs: Array<{ index: number, title: string }> }) => {
    return (
        <Layout title={`${song.index}. ${song.title}`} songs={songs}>
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
            </Container>
        </Layout>
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