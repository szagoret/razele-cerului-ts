import {Container, Grid, Typography} from "@mui/material";
import Song from "../../src/components/Song";
import React from "react";
import {SongType} from "../../song";
import {gql} from "@apollo/client";
import Layout from "../../src/components/Layout";
import client from "../../apollo-client";

const Index = ({song, songs}: { song: SongType, songs: Array<{ index: number, title: string }> }) => {
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
                                        color: '#4c4c4c'
                                    }}>
                            {`${song.index}. ${song.title}`}
                        </Typography>
                        <Typography variant={"caption"}
                                    component={"h6"}
                                    align={"center"}
                                    sx={{
                                        color: '#4c4c4c'
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

export async function getStaticPaths() {
    const {data} = await client.query({
        query: gql`
        query {
songs(pagination: { limit: 1000 }) {
    data {
      attributes {
        index
      }
    }
  }
}
      `,
    });
    const paths = data.songs.data.map(({attributes: song}: any) => {
        return ({
            // @ts-ignore
            params: {index: String(song.index)}
        });
    });
    return ({
        paths: paths,
        fallback: false
    });
};

export async function getStaticProps({params}: any) {
    const {data: {songs: {data: songs}}} = await client.query({
        query: gql`
        query Songs($index: Int) {
songs(pagination: { limit: 1 }, filters: { index: { eq: $index } } ) {
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
        variables: {index: parseInt(params?.index as string)}
    });

    const {data: {songs: {data: allSongs}}} = await client.query({
        query: gql`
        query {
songs(pagination: { limit: 1000 }) {
    data {
      attributes {
        index
        title
      }
    }
  }
}
      `,
    });

    return ({
        props: {
            song: toSong(songs[0].attributes),
            songs: allSongs.map(({attributes: {index, title}}: any) => ({index, title}))
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