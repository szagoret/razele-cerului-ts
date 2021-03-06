import type {NextApiRequest, NextApiResponse} from 'next'
import {chain, omit, reduce, replace, size, slice, sortBy, split, trim} from "lodash";
import db from "../../db/razele-cerului_2021_raw.json";


export default function transform(req: NextApiRequest, res: NextApiResponse<any>) {
    const fDb = chain(db)
        .map((hymnArr: Array<any>) => {
            const removeHeadSpace = replace(hymnArr[1], "\n",'');
            const removeTail = replace(removeHeadSpace, /,\s\n*$/g, (m, a) => '');
            return ({
                index: parseInt(hymnArr[0], 0),
                // title: replace(hymnArr[1], /\n*.\n*$/, (m, a) => ''),
                title: trim(removeTail),
                lyrics: hymnArr[6]
            });
        })
        .map((song) => {
            // @ts-ignore
            const normalizedStanzas = replace(song.lyrics, /\n*(Куплет\s*\d?)\n*/gmi, (m, a1, ...rest) => `\n\nКуплет\n`);
            const normalizedRefrens = replace(normalizedStanzas, /\n*\.?\n*(Припев)\n*/gmi, (m, a1, ...rest) => `\n\nПрипев\n`);
            const removeFirstSpaceStanza = replace(normalizedRefrens, /^\n*(Куплет\s*\d?)\n*/, (m, a1, ...rest) => `Куплет\n`);
            const removeFirstSpaceRefrain = replace(removeFirstSpaceStanza, /^\n*(Припев)\n*/, (m, a1, ...rest) => `Припев\n`);
            const removeLastDotSpace = replace(removeFirstSpaceRefrain, /\n*.\n*$/, (m, a) => '');
            const lyrics = split(removeLastDotSpace, /\r?\n\n/gi);
            // @ts-ignore
            return {...song, lyrics};
        })
        .map((song) => {
            let stanzaIndex = 0;
            const stanzas = chain(song.lyrics)
                .map((stanza) => {
                    const lines = split(stanza, "\n").map(trim);
                    const line0 = lines[0].match(/Куплет/gi);

                    const typeSequence = line0
                        ? {type: "stanza", sequence: ++stanzaIndex}
                        : {type: "refrain"};

                    return {...typeSequence, lines: slice(lines, 1)};
                })
                .value();

            return omit({...song, stanzas}, ["lyrics"]);
        })
        .value();

    // @ts-ignore
    const longestSongTitle = reduce(fDb, (acc, song) => size(acc.title) < size(song.title) ? song : acc);

    const sortedSongList = sortBy(fDb, ["index"]);
    const imageTransformationArray = sortedSongList.map((song: {index:number, title: string}) => (`${song.index}#${song.title}`));

    res.status(200).json([])
}