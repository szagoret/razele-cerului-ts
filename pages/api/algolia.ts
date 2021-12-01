import type {NextApiRequest, NextApiResponse} from 'next'
import {chain, inRange} from "lodash";
import db2021 from '../../db/db-2021.json';

export default function transform(req: NextApiRequest, res: NextApiResponse<any>) {

    chain(db2021).map(song => ({
        
    }))

res.status(200).json([])
}