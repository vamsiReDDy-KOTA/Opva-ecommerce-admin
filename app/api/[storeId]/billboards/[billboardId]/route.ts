import { auth } from "@/auth"
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const config = {
    runtime: 'nodejs',
};

export async function GET(req: Request, { params }: { params: { billboardId: string } }) {
    try {


        if (!params.billboardId) {
            return new NextResponse("billboard Id is required", { status: 400 });
        }


        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId,

            }
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.error('[BILLBOARD_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string, billboardId: string } }) {
    try {
        console.log(req)
        const rawBody = await req.text();
        console.log("Raw body:", rawBody);

        const body = rawBody ? JSON.parse(rawBody) : {};
        const { label, imageUrl } = body;



        if (!label) {
            return new NextResponse("label is required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("image Url is required", { status: 400 });
        }
        if (!params.billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
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

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId
            },
            data: {
                label,
                imageUrl
            }
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.error('[BILLBOARD_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string, billboardId: string } }) {
    try {


        if (!params.billboardId) {
            return new NextResponse("billboard Id is required", { status: 400 });
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

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId,

            }
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.error('[BILLBOARD_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
