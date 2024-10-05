import { auth } from "@/auth"
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const config = {
    runtime: 'nodejs',
};

export async function GET(req: Request, { params }: { params: { colorId: string } }) {
    try {


        if (!params.colorId) {
            return new NextResponse("color Id is required", { status: 400 });
        }


        const color = await prismadb.color.findUnique({
            where: {
                id: params.colorId,

            }
        });

        return NextResponse.json(color);
    } catch (error) {
        console.error('[COLOR_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string, colorId: string } }) {
    try {
        console.log(req)
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
        if (!params.colorId) {
            return new NextResponse("color id is required", { status: 400 });
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

        const color = await prismadb.color.updateMany({
            where: {
                id: params.colorId
            },
            data: {
                name,
                value
            }
        });

        return NextResponse.json(color);
    } catch (error) {
        console.error('[COLOR_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string, colorId: string } }) {
    try {


        if (!params.colorId) {
            return new NextResponse("color Id is required", { status: 400 });
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

        const color = await prismadb.color.deleteMany({
            where: {
                id: params.colorId,

            }
        });

        return NextResponse.json(color);
    } catch (error) {
        console.error('[COLOR_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
