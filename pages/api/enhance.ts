import type {NextApiRequest, NextApiResponse} from 'next'
import {chain, inRange} from "lodash";
import db2021 from '../../db/db-2021.json';

export default function transform(req: NextApiRequest, res: NextApiResponse<any>) {

   const enhancedSongs =  chain(db2021).map((song) => {
        let topic;
        if (inRange(song.index, 1, 33)) {
            topic = "LAUDĂ ŞI MĂRIRE";
        } else if (inRange(song.index, 33, 42)) {
            topic = "MULŢUMIRE";
        } else if (inRange(song.index, 42, 70)) {
            topic = "RUGĂCIUNE";
        } else if (inRange(song.index, 70, 81)) {
            topic = "SERVICIUL DIVIN";
        } else if (inRange(song.index, 81, 94)) {
            topic = "CUVÂNTUL DOMNULUI";
        } else if (inRange(song.index, 94, 103)) {
            topic = "BISERICA DOMNULUI";
        } else if (inRange(song.index, 103, 111)) {
            topic = "LA BOTEZ";
        } else if (inRange(song.index, 111, 119)) {
            topic = "CINA DOMNULUI";
        } else if (inRange(song.index, 119, 153)) {
            topic = "SUFERINŢELE DOMNULUI";
        } else if (inRange(song.index, 153, 171)) {
            topic = "MISIUNEA EVANGHELIEI";
        } else if (inRange(song.index, 171, 234)) {
            topic = "CHEMARE LA POCAINŢĂ";
        } else if (inRange(song.index, 234, 257)) {
            topic = "POCAINŢĂ ŞI CONSACRARE";
        } else if (inRange(song.index, 257, 277)) {
            topic = "ÎNDURAREA DOMNULUI";
        } else if (inRange(song.index, 277, 341)) {
            topic = "ÎNCREDERE ŞI MÂNGÂIERE";
        } else if (inRange(song.index, 341, 377)) {
            topic = "ÎMBĂRBĂTARE ŞI VEGHERE";
        } else if (inRange(song.index, 377, 386)) {
            topic = "STAREA DE MILUIRE";
        } else if (inRange(song.index, 386, 423)) {
            topic = "PE URMELE LUI ISUS";
        } else if (inRange(song.index, 423, 443)) {
            topic = "LUPTA SUFLETEASCĂ";
        } else if (inRange(song.index, 443, 452)) {
            topic = "IUBIREA FRĂŢEASCĂ";
        } else if (inRange(song.index, 452, 464)) {
            topic = "FAMILIA CREŞTINĂ";
        } else if (inRange(song.index, 464, 481)) {
            topic = "LA DESPĂRŢIRE";
        } else if (inRange(song.index, 481, 492)) {
            topic = "PENTRU INMORMÂNTĂRI";
        } else if (inRange(song.index, 492, 513)) {
            topic = "NAŞTEREA DOMNULUI";
        } else if (inRange(song.index, 513, 529)) {
            topic = "ÎNVIEREA DOMNULUI";
        } else if (inRange(song.index, 529, 535)) {
            topic = "LUCRAREA DUHULUI SFÂNT";
        } else if (inRange(song.index, 535, 593)) {
            topic = "VENIREA DOMNULUI";
        } else if (inRange(song.index, 593, 607)) {
            topic = "ANUL NOU";
        } else if (inRange(song.index, 607, 619)) {
            topic = "SĂRBĂTOAREA MULŢUMIRII";
        } else if (inRange(song.index, 619, 628)) {
            topic = "DIVERSE OCAZII";
        } else if (inRange(song.index, 628, 680)) {
            topic = "CÂNTĂRILE COPIILOR";
        } else if (inRange(song.index, 680, 709)) {
            topic = "CÂNTĂRILE TINERILOR";
        }

        return {...song, topic}
    }).value();

    res.status(200).json([])
}