import * as React from 'react';
import {Box, Container, Grid, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {GetStaticProps} from "next";
import {chain, chunk, sortBy} from "lodash";
import db from "../db/db-2021.json";
import {useRouter} from "next/router";
import Layout from "../src/components/Layout";
import {createTheme, ThemeProvider} from '@mui/material/styles';


type HomePagePropTypes = {
    songs: Array<{ index: number, title: string }>,
};
const PrimarySearchAppBar = ({songs}: HomePagePropTypes) => {
    const router = useRouter();
    const filterSongs = sortBy(chain(songs).map(song => ({
        index: song.index,
        title: `${song.index}. ${song.title}`
    })).value(), ["index"]);
    const arrayOfSongs: Array<Array<{ index: number, title: string }>> = chunk(sortBy(songs, ["index"]), 100);
    return (
        <Layout title="Razele Cerului" songs={filterSongs}>
            <ThemeProvider
                theme={createTheme({
                    components: {
                        MuiListItemButton: {
                            defaultProps: {
                            },
                        }
                    },
                })}
            >
                <Box sx={{flexGrow: 1}}>
                    <Container>
                        <Grid container spacing={2} sx={{p: 1}}>
                            {
                                arrayOfSongs.map((ch: Array<{ index: number, title: string }>, i: number) => (
                                    <Grid key={i} item xs={12} sm={6} md={4}>
                                        <List dense>
                                            {
                                                ch.map((s: { index: number, title: string }, i: number) => (
                                                    <ListItem key={s.index}>
                                                        <ListItemButton>
                                                            <ListItemText
                                                                primary={`${s.index}. ${s.title}`}
                                                                onClick={() => {
                                                                    router.push(`/cantarea/${s.index}`).finally();
                                                                }}
                                                            />
                                                        </ListItemButton>
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Container>
                </Box>
            </ThemeProvider>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = (context) => {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            songs: sortBy(db.map((song) => ({index: song.index, title: song.title})), ["index"]),
        },
    }
}
export default PrimarySearchAppBar