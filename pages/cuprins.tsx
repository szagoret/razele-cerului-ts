import {Container} from "@mui/material";
import Link from '../src/components/Link';
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from '@mui/lab';
import {GetStaticProps} from "next";
import database from '../db/database.json';

export type StanzaType = {
    type: "stanza" | "refrain",
    sequence: number,
    lines: Array<string>
};

export type SongType = {
    index: number,
    title: string,
    stanzas: Array<StanzaType>
};

type CuprinsProps = {
    songs: Array<SongType>
}
export type SongPropType = {
    song: SongType
}
const RCTimeLineItem = ({song}: SongPropType) => (
    <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
            {song.index}
        </TimelineOppositeContent>
        <TimelineSeparator>
            <TimelineDot/>
            <TimelineConnector/>
        </TimelineSeparator>
        <TimelineContent>
        <Link href={`/cantarea/${song.index}`}>
            {song.title}
        </Link>
        </TimelineContent>
    </TimelineItem>);

const Cuprins = ({songs}: CuprinsProps) => {


    return (
        <Container>
            <Timeline>
                {
                    songs.map((song, i) => <RCTimeLineItem key={i} song={song}/>)
                }
            </Timeline>
        </Container>
    );

};

export const getStaticProps: GetStaticProps = (context) => {
    return {
        props: {
            songs: database
        },
    }
}

export default Cuprins;