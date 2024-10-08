import type { NextApiRequest, NextApiResponse } from "next";

export default function userHandler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { query, method } = req;
    const id = parseInt(query.id as string, 10);
    const name = query.name as string;

    switch (method) {
        case "GET":
            // Get data from your database
            res.status(200).json({ id, name: `User ${id}` });
            break;
        case "PUT":
            // Update or create data in your database
            res.status(200).json({ id, name: name || `User ${id}` });
            break;
        case "post":
            res.status(200).json({ name: name });
        default:
            res.setHeader("Allow", ["GET", "PUT"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}