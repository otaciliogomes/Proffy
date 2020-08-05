import { Request, Response } from 'express';
import db from '../database/connection';

export default class Connections {

    async index(req: Request, res: Response){
        const allConnectios = await db('connections').count('* as total');

        const { total } = allConnectios[0];

        res.json({ total })
    }

    async create(req: Request, res: Response){
        const { user_id } = req.body;

        await db('connections').insert({
            user_id,
        });

        return res.status(201).send()
    }

}