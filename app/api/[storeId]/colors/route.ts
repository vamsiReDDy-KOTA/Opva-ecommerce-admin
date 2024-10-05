import { auth } from "@/auth"
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const config = {
    runtime: 'nodejs',
};

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {

        const rawBody = await req.text();
        console.log("Raw body:", rawBody);

        const body = rawBody ? JSON.parse(rawBody) : {};
        const { name, value } = body;



        if (!name) {
            return new NextResponse("name is required", { status: 400 });
        }

        if (!value) {
            return new NextResponse("value is required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: '2'
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }


        const color = await prismadb.color.create({

            data: {
                name,
                value,
                storeId: params.storeId
            }
        });

        return NextResponse.json(color);
    } catch (error) {
        console.error('[COLOR_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {



        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const colors = await prismadb.color.findMany({
            where: {
                storeId: params.storeId,

            }
        })
        return NextResponse.json(colors);
    } catch (error) {
        console.error('[COLOR_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

