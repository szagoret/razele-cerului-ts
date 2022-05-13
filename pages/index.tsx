import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {chain, chunk, sortBy} from 'lodash';
import {useRouter} from "next/router";
import Layout from "../src/components/Layout";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import client from "../apollo-client";
import {gql} from "@apollo/client";
import {SongType} from "../song";


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
        <Layout title="Razele Cerului" songs={filterSongs} thumbPath="razelecerului.jpg">
            <ThemeProvider
                theme={createTheme({
                    components: {
                        MuiListItemButton: {
                            defaultProps: {},
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
                                                    <ListItem key={`${s.index}-${i}`}>
                                                        <ListItemButton>
                                                            <ListItemText
                                                                primary={`${s.index}. ${s.title}`}
                                                                onClick={() => {
                                                                    router.push(`/cantarea/${s.index}`, undefined, {shallow: true}).finally();
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

export async function getStaticProps({params}: any) {
    const {data: {songs: {data: songs}}} = await client.query({
        query: gql`
        query {
songs(pagination: { limit: 1000 }) {
    data {
      attributes {
        title
        textjson
        topic {
          data {
            attributes {
              value
            }
          }
        }
        index
      }
    }
  }
}
      `,
    });
    return ({
        props: {
            songs: sortBy(songs.filter((s: any) => !!s.attributes).map(({attributes}: any) => (toSong(attributes))), ["index"]),
        }
    });
};

const toSong = (attributes: any): SongType => {
    return {
        index: attributes.index,
        title: attributes.title,
        stanzas: attributes.textjson,
        topic: ''//attributes?.topic?.data?.attributes?.value
    }
};

export default PrimarySearchAppBar