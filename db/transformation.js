import {chain, omit, slice, split} from "lodash";

const Transformation = (db) => {
    return chain(db)
        .map((hymnArr) => ({
            index: parseInt(hymnArr[0], 0),
            title: hymnArr[1],
            lyrics: hymnArr[6]
        }))
        .map((song) => {
            const lyrics = split(song.lyrics, /\r?\n\n/);
            return {...song, lyrics};
        })
        .map((song) => {
            const stanzas = chain(song.lyrics)
                .map((stanza) => {
                    const lines = split(stanza, /\r?\n/);
                    const line0 = lines[0].match(/Куплет\s(\d)/);

                    const typeSequence = line0
                        ? {type: "stanza", sequence: parseInt(line0[1], 0)}
                        : {type: "refrain"};

                    return {...typeSequence, lines: slice(lines, 1)};
                })
                .value();

            return omit({...song, stanzas}, ["lyrics"]);
        })
        .value();
}

export default Transformation;