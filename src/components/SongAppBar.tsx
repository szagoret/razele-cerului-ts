import {AppBar, Box, BoxProps, Button, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {alpha, styled, useTheme} from "@mui/material/styles";
import {useRouter} from "next/router";
// import "@docsearch/css"
import Logo from "./logo";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import {useSettingsContext} from "src/components/settings";
import Link from "./Link";
import {DocSearchModal, useDocSearchKeyboardEvents} from "@docsearch/react";
import GlobalStyles from '@mui/material/GlobalStyles';
import {createPortal} from "react-dom";
import '@docsearch/css';

const Shadow = ({sx, ...other}: BoxProps) => (
    <Box
        sx={{
            left: 0,
            right: 0,
            bottom: 0,
            height: 24,
            zIndex: -1,
            width: 1,
            m: 'auto',
            borderRadius: '50%',
            position: 'absolute',
            boxShadow: (theme) => theme.customShadows.z8,
            ...sx,
        }}
        {...other}
    />
);
const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "200px",
    [theme.breakpoints.up('sm')]: {
        width: "250px",
    },
    [theme.breakpoints.up('md')]: {
        width: "300px",
    },
    cursor: 'pointer',
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

type SongAppBarPropTypes = {
    songs: Array<{ index: number, title: string }>,
};

const FADE_DURATION = 100;
const SongAppBar = ({songs}: SongAppBarPropTypes) => {
    const theme = useTheme();
    const {onToggleMode, themeMode} = useSettingsContext();
    const router = useRouter();


    const searchButtonRef = React.useRef(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [initialQuery, setInitialQuery] = React.useState<string | undefined>(undefined);

    const onOpen = React.useCallback(() => {
        setIsOpen(true);
    }, [setIsOpen]);

    const onClose = React.useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const onInput = React.useCallback(
        (event: KeyboardEvent) => {
            setIsOpen(true);
            setInitialQuery(event.key);
        },
        [setIsOpen, setInitialQuery]
    );

    useDocSearchKeyboardEvents({
        isOpen,
        onOpen,
        onClose,
        onInput,
        searchButtonRef,
    });

    return (
        <>
            <AppBar position="sticky" sx={{zIndex: theme.zIndex.appBar}}>
                <Toolbar variant={"dense"} sx={{px: 0}}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" flexGrow={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Logo sx={{
                                display: {
                                    xs: 'none',
                                    sm: 'block'
                                }
                            }}/>
                            <Button variant="text" component={Link} noLinkStyle href="/" sx={{
                                mx: 1,
                                color: theme.palette.getContrastText('#000'),
                            }}>
                                <Typography variant={"subtitle1"}>
                                    {'Razele Cerului'}
                                </Typography>
                            </Button>
                            <Search ref={searchButtonRef} onClick={onOpen}>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <Button variant={'text'} disableRipple
                                        sx={{paddingLeft: `calc(1em + ${theme.spacing(4)})`}}>
                                    <Typography sx={{color: theme.palette.getContrastText('#000')}}>
                                        {"Caută…"}
                                    </Typography>
                                </Button>
                            </Search>
                        </Stack>
                        <IconButton
                            sx={{color: t => t.palette.getContrastText('#000'),}}
                            onClick={onToggleMode}>
                            {theme.palette.mode === 'light' ? <LightModeOutlinedIcon/> : <DarkModeOutlinedIcon/>}
                        </IconButton>
                    </Stack>
                </Toolbar>
                <Shadow/>
            </AppBar>
            {isOpen &&
                createPortal(
                    <DocSearchModal
                        appId={'6FZ2U75TWW'}
                        apiKey={'7ebf61ebf147b0f304d66848073e7087'}
                        indexName={'razelecerului'}
                        onClose={onClose}
                        initialScrollY={window.scrollY}
                        initialQuery={initialQuery}
                        placeholder={'Caută…'}
                    />,
                    document.body
                )}
            <GlobalStyles
                styles={(theme) => ({
                    html: {
                        ':root': {
                            '--docsearch-primary-color':
                                theme.palette.mode === 'dark'
                                    ? theme.palette.grey[300]
                                    : theme.palette.grey[500],
                            '--docsearch-text-color': theme.palette.text.primary,
                            '--docsearch-muted-color': theme.palette.grey[600],
                            '--docsearch-searchbox-shadow': 0,
                            '--docsearch-hit-shadow': 0,
                            '--docsearch-footer-shadow': 0,
                            '--docsearch-spacing': theme.spacing(1.5),
                            '--docsearch-hit-active-color':
                                theme.palette.mode === 'dark'
                                    ? theme.palette.grey[300]
                                    : theme.palette.grey[600],
                            '--docsearch-logo-color': theme.palette.grey[600],
                            '--docsearch-searchbox-focus-background': 'unset',
                            '--docsearch-footer-background': 'unset',
                            '--docsearch-modal-background': theme.palette.background.paper,
                        },
                    },
                    body: {
                        '.DocSearch-Container': {
                            transition: `opacity ${FADE_DURATION}ms`,
                            zIndex: theme.zIndex.appBar + 100,
                            backgroundColor: alpha(theme.palette.grey[900], 0.7),
                            //     theme.palette.mode === 'dark'
                            //         ? alpha(theme.palette.grey[900], 0.7)
                            //         : alpha(theme.palette.grey[600], 0.2),
                            backdropFilter: 'blur(0.1px)',
                        },
                        '& .DocSearch-Modal': {
                            maxWidth: '700px',
                            boxShadow: `0px 4px 20px ${
                                theme.palette.mode === 'dark'
                                    ? alpha(theme.palette.background.paper, 0.7)
                                    : alpha(theme.palette.grey[700], 0.2)
                            }`,
                            ...(theme.palette.mode === 'dark' && {
                                border: '1px solid',
                                borderColor: theme.palette.grey[700],
                            }),
                            // docsearch.css: <= 750px will be full screen modal
                            borderRadius: `clamp(0px, (100vw - 500px) * 9999, ${theme.shape.borderRadius}px)`,
                        },
                        '& .DocSearch-SearchBar': {
                            borderBottom: '1px solid',
                            borderColor:
                                theme.palette.mode === 'dark'
                                    ? theme.palette.grey[700]
                                    : theme.palette.grey[200],
                            padding: theme.spacing(1),
                        },
                        '& .DocSearch-Form': {
                            '& .DocSearch-Reset': {
                                display: 'none',
                            },
                            '& .DocSearch-Input': {
                                paddingLeft: theme.spacing(2.5),
                            },
                            '& .DocSearch-Search-Icon': {
                                width: '20px',
                                height: '20px',
                            },
                        },
                        '& .DocSearch-Cancel': {
                            display: 'block',
                            alignSelf: 'center',
                            cursor: 'pointer',
                            height: '1.5rem',
                            marginRight: theme.spacing(1),
                            padding: theme.spacing(0.3, 0.8, 0.6, 0.8),
                            fontSize: 0,
                            borderRadius: 5,
                            backgroundColor:
                                theme.palette.mode === 'dark'
                                    ? theme.palette.grey[800]
                                    : theme.palette.grey[50],
                            border: '1px solid',
                            borderColor:
                                theme.palette.mode === 'dark'
                                    ? theme.palette.grey[600]
                                    : theme.palette.grey[300],
                            '&::before': {
                                content: '"esc"',
                                fontSize: theme.typography.pxToRem(12),
                                letterSpacing: '.08rem',
                                fontWeight: 700,
                                color: theme.palette.text.secondary,
                            },
                        },
                        '& .DocSearch-Dropdown': {
                            minHeight: 384, // = StartScreen height, to prevent layout shift when first char
                            '&::-webkit-scrollbar-thumb': {
                                borderColor:
                                    theme.palette.mode === 'dark'
                                        ? theme.palette.grey[900]
                                        : theme.palette.background.paper,
                                backgroundColor:
                                    theme.palette.mode === 'dark'
                                        ? theme.palette.grey[700]
                                        : theme.palette.grey[500],
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: theme.palette.background.paper,
                            },
                        },
                        '& .DocSearch-Dropdown-Container': {
                            '& .DocSearch-Hits:first-of-type': {
                                '& .DocSearch-Hit-source': {
                                    paddingTop: theme.spacing(1),
                                },
                            },
                        },
                        '& .DocSearch-Hit-source': {
                            top: 'initial',
                            paddingTop: theme.spacing(2),
                            background: theme.palette.background.paper,
                            fontSize: theme.typography.pxToRem(13),
                            fontWeight: 500,
                            color: theme.palette.text.secondary,
                        },
                        '& .DocSearch-Hit': {
                            paddingBottom: 0,
                            '&:not(:first-of-type)': {
                                marginTop: -1,
                            },
                        },
                        '& .DocSearch-Hit a': {
                            backgroundColor: 'transparent',
                            padding: theme.spacing(0.25, 0),
                            paddingLeft: theme.spacing(2),
                            border: '1px solid transparent',
                            // borderBottomColor:
                            //     theme.palette.mode === 'dark'
                            //         ? theme.palette.grey[700]
                            //         : theme.palette.grey[100],
                        },
                        '& .DocSearch-Hit-content-wrapper': {
                            paddingLeft: theme.spacing(2),
                        },
                        '& .DocSearch-Hit-title': {
                            fontSize: theme.typography.pxToRem(14),
                            color: `${theme.palette.text.primary}`,
                        },
                        '& .DocSearch-Hit-path': {
                            fontSize: theme.typography.pxToRem(12),
                            color: `${theme.palette.text.secondary}`,
                        },
                        '& .DocSearch-Hit-Select-Icon': {
                            height: '15px',
                            width: '15px',
                        },
                        '& .DocSearch-Hit[aria-selected="true"] a': {
                            backgroundColor:
                                theme.palette.mode === 'dark'
                                    ? theme.palette.grey[800]
                                    : theme.palette.grey[50],
                            // borderColor:
                            //     theme.palette.mode === 'dark'
                            //         ? theme.palette.grey[400]
                            //         : theme.palette.grey[500],
                            borderRadius: theme.shape.borderRadius,
                        },
                        '& .DocSearch-Hit-action, & .DocSearch-Hits mark': {
                            color: `${
                                theme.palette.mode === 'dark'
                                    ? theme.palette.grey[400]
                                    : theme.palette.grey[500]
                            }`,
                        },
                        '& .DocSearch-Footer': {
                            borderTop: `1px solid ${theme.palette.grey[400]}`,
                            color: theme.palette.grey[400],
                            '& .DocSearch-Logo': {
                                a: {
                                    svg: {
                                        'path, rect': {
                                            fill: theme.palette.grey[400]
                                        }
                                    }
                                }
                            },
                            // borderColor:
                            //     theme.palette.mode === 'dark'
                            //         ? theme.palette.grey[700]
                            //         : theme.palette.grey[200],
                            '& .DocSearch-Commands': {
                                display: 'none',
                            },
                        },
                    },
                })}
            />
        </>
    );
};

export default SongAppBar;