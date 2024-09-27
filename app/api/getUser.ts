// /pages/api/getUser.ts
"use server"
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // const { id } = req.query;
        try {
            const user = await prisma.user.findMany()
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
