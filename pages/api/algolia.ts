import type {NextApiRequest, NextApiResponse} from 'next'
import {chain} from "lodash";
import db2021 from '../../db/db-2021.json';

export default function transform(req: NextApiRequest, res: NextApiResponse<any>) {

    const algoliaIndexArray = chain(db2021).map(song => ({
        title: song.title,
        index: song.index,
        topic: song.topic,
        hierarchy: {
            "lvl0": song.topic,
            "lvl1": song.title,
        },
        url: `https://razelecerului.vercel.app/cantarea/${song.index}`,
        type: "lvl1",
    })).value();

    res.status(200).json(algoliaIndexArray)
}