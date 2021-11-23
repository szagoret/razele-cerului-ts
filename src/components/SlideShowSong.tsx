import {SongType} from "../../pages/cuprins";
import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {MobileStepper} from "@mui/material";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import SwipeableViews from 'react-swipeable-views';
import {Box} from "@mui/system";

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
        >
            <AppBar position="sticky" color="primary" sx={{top: 0, bottom: 'auto'}}>
                <Toolbar>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        {song.title}
                    </Typography>
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
            <Box sx={{
                backgroundColor: '#000',
                display: 'flex',
                justifyContent: "center",
                height: '100%',
                color: '#fff'
            }}>
                <SwipeableViews
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {song.stanzas.map((step, index) => (
                        <div key={index}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <Box>
                                    {step.lines.map((line, i) => (
                                        <Typography key={i} sx={{whiteSpace: 'pre-wrap', p: 1, fontSize: "calc(36px + 3vh)"}}>
                                            {line}
                                        </Typography>
                                    ))}
                                </Box>
                            ) : null}
                        </div>
                    ))}
                </SwipeableViews>
            </Box>
            <AppBar position="fixed" color="primary" sx={{top: 'auto', bottom: 0}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'center'}}>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        sx={{minWidth: 400}}
                        nextButton={
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                            >
                                Next
                                <KeyboardArrowRight/>
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                <KeyboardArrowLeft/>
                                Back
                            </Button>
                        }
                    />
                </Toolbar>
            </AppBar>
        </Dialog>
    );
};

export default SlideShowSong;