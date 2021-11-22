import type {NextApiRequest, NextApiResponse} from 'next'
import {chain} from 'lodash';
import db from '../../db/db.json';

type Data = {
    title: string,
    content: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const songs = chain(db).map((hymnArr: Array<any>) => ({index: hymnArr[0], title: hymnArr[1], lyrics: hymnArr[6]}))
        .value();
    console.log(songs);

    res.status(200).json({title: 'John Doe', content: " sa fie bine"})
}

