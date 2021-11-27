import {AppBar, Autocomplete, Box, Button, Grid, InputBase, Toolbar, Typography} from "@mui/material";
import Image from "next/image";
import brandImage from "../../public/sun-rays-md.png";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {alpha, styled} from "@mui/material/styles";
import {useRouter} from "next/router";


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

type SongAppBarPropTypes = {
    songs: Array<{ index: number, title: string }>,
};
const SongAppBar = ({songs}: SongAppBarPropTypes) => {
    const router = useRouter();
    return (
        <AppBar position="sticky" sx={{
            backgroundColor: '#2a9d8f'
        }}>
            <Toolbar sx={{
                display: 'flex',
                alignContent: 'center'
            }}>
                <Button onClick={() => router.push('/').finally()}>
                    <Box sx={{
                        display: {
                            xs: 'none', sm: 'block'
                        }
                    }}>
                        <Image
                            src={brandImage}
                            alt="Branc image"
                            width={40}
                            height={40}
                            placeholder="blur"
                        />
                    </Box>
                    <Typography variant={"subtitle2"} sx={{color: '#fff'}}>
                        Razele Cerului
                    </Typography>
                </Button>
                <Grid container sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Autocomplete id="search-songs"
                                      autoComplete
                                      getOptionLabel={(option) => option.title}
                                      options={songs}
                                      onChange={(event: any, newValue: { index: number, title: string } | null) => router.push(`/cantarea/${newValue?.index}`).finally()}
                                      renderOption={(props, option, {inputValue}) => {
                                          const matches = match(option.title, inputValue);
                                          const parts = parse(option.title, matches);
                                          return (
                                              <li {...props}>
                                                  <div>
                                                      {parts.map((part, index) => (
                                                          <span key={index}
                                                                style={{
                                                                    fontWeight: part.highlight ? 700 : 400,
                                                                    color: part.highlight ? '#e76f51' : 'inherit'
                                                                }}>
                                                          {part.text}
                                                      </span>
                                                      ))}
                                                  </div>
                                              </li>
                                          );
                                      }}
                                      renderInput={(params) => {
                                          return (
                                              <Search>
                                                  <SearchIconWrapper>
                                                      <SearchIcon/>
                                                  </SearchIconWrapper>
                                                  <StyledInputBase ref={params.InputProps.ref}
                                                                   placeholder="Caută…"
                                                                   inputProps={{
                                                                       'aria-label': 'search',
                                                                       width: '100%', ...params.inputProps
                                                                   }}
                                                  />
                                              </Search>
                                          );
                                      }}
                        />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default SongAppBar;