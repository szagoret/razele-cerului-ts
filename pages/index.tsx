import * as React from 'react';
import {alpha, styled} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import {
    AppBar,
    Autocomplete,
    Box,
    Button,
    Container,
    Grid,
    InputBase,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import {GetStaticProps} from "next";
import {chain, chunk, sortBy} from "lodash";
import db from "../db/database.json";
import {useRouter} from "next/router";
import brandImage from '../public/sun-rays-md.png';
import Image from 'next/image'
import SongAppBar from "../src/components/SongAppBar";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%'
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%'
    },
    width: '100%'
}));

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
        <Box sx={{flexGrow: 1}}>
            <SongAppBar songs={filterSongs} />
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
                                                        // secondary={secondary ? 'Secondary text' : null}
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