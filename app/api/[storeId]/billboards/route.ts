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
        const { label, imageUrl } = body;

        console.log("Parsed label:", label);

        if (!label) {
            return new NextResponse("label is required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("image Url is required", { status: 400 });
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


        const billboard = await prismadb.billboard.create({

            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.error('[BILLBOARD_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {



        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId,

            }
        })
        return NextResponse.json(billboards);
    } catch (error) {
        console.error('[BILLBOARD_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

