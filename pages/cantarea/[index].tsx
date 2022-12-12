import database from '../../db/db-2021.json';
import {find, sortBy} from 'lodash';
import {GetStaticProps} from "next";
import {Container, Grid, Typography} from "@mui/material";
import Song from "src/components/Song";
import React from "react";
import {SongType} from "src/song";
import Layout from "src/components/Layout";
import {useSettingsContext} from "src/components/settings";
import {useTheme} from "@mui/material/styles";

const Index = ({song, songs}: { song: SongType, songs: Array<{ index: number, title: string }> }) => {
    const theme = useTheme();
    const {themeMode} = useSettingsContext();
    return (
        <Layout title={`${song.index}. ${song.title}`} songs={songs} thumbPath={`rc-${song.index}.jpeg`}>
            <Container sx={{p: 3, display: "flex", justifyContent: "center", flexDirection: 'column'}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant={"h6"}
                                    align={"center"}
                                    sx={{
                                        borderBottom: "1px solid",
                                        borderColor: '#dfdfdf',
                                        color: themeMode === 'light' ? theme.palette.grey[700] : theme.palette.getContrastText('#000'),
                                    }}>
                            {`${song.index}. ${song.title}`}
                        </Typography>
                        <Typography variant={"caption"}
                                    component={"h6"}
                                    align={"center"}
                                    sx={{
                                        color: themeMode === 'light' ? theme.palette.grey[700] : theme.palette.getContrastText('#000'),
                                    }}>
                            {song.topic}
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