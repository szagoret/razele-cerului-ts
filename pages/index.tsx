import type {GetStaticProps} from 'next'
import {Container, Grid} from "@mui/material";
import {chain, sortBy} from "lodash";
import db from "../db/db.json";
import Cantare from "../src/components/Cantare";

// @ts-ignore
const Home = ({songs}) => {
    return (
        <Container>
            <Grid container spacing={2} sx={{p:1}}>
                {
                    songs.map((song: object, i: number) =>
                        <Grid item key={i}>
                            <Cantare song={song}/>
                        </Grid>
                    )
                }

            </Grid>
        </Container>
    );
}
export const getStaticProps: GetStaticProps = (context) => {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const songs = chain(db).map((hymnArr: Array<any>) => ({
        index: parseInt(hymnArr[0]),
        title: hymnArr[1],
        lyrics: hymnArr[6]
    }))
        .value();


    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            songs: sortBy(songs, ["index"])
        },
    }
}
export default Home
