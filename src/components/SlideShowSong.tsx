import {SongType} from "../../pages/cuprins";
import * as React from 'react';
import {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import SwipeableViews from 'react-swipeable-views';
import {Box} from "@mui/system";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type SlideShowSongPropsType = {
    song: SongType,
    open: boolean,
    handleClose: () => void
}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref}  {...props} />;
});
const SlideShowSong = ({song, open, handleClose}: SlideShowSongPropsType) => {
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = song.stanzas.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            scroll={"body"}
        >
            <Box sx={{
                backgroundColor: '#000',
                display: 'flex',
                justifyContent: "center",
                height: '100%',
                color: '#fff',
                mb: '45px',
                p: 1
            }}>
                <SwipeableViews
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {song.stanzas.map((step, index) => (
                        <div key={index}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <>
                                    {step.lines.map((line, i) => (
                                        <Typography key={i}
                                                    sx={{
                                                        whiteSpace: 'pre-wrap',
                                                        p: 1,
                                                        fontSize: "calc(12px + 3vw)"
                                                    }}>
                                            {line}
                                        </Typography>
                                    ))}
                                </>
                            ) : null}
                        </div>
                    ))}
                </SwipeableViews>
            </Box>
            <AppBar position="fixed" color="primary" sx={{top: 'auto', bottom: 0}}>
                <Toolbar sx={{display: 'flex', justifyContent: "space-between"}} variant="dense">
                    <Typography sx={{ml: 2}} variant={"body2"} component="div">
                        {song.title}
                    </Typography>
                    <div>
                        <IconButton size="large"
                                    sx={{color: '#fff', mr: 1}}
                                    onClick={handleBack}
                                    disabled={activeStep === 0}>
                            <KeyboardArrowLeftIcon/>
                        </IconButton>
                        <IconButton size="small"
                                    sx={{color: '#fff', ml: 1}}
                                    onClick={handleNext}
                                    disabled={activeStep === maxSteps - 1}>
                            <KeyboardArrowRightIcon/>
                        </IconButton>
                    </div>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Dialog>
    );
};

export default SlideShowSong;