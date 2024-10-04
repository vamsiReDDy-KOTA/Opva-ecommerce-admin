import { auth } from "@/auth"
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const config = {
    runtime: 'nodejs',
};

export async function GET(req: Request, { params }: { params: { sizeId: string } }) {
    try {


        if (!params.sizeId) {
            return new NextResponse("size Id is required", { status: 400 });
        }


        const size = await prismadb.size.findUnique({
            where: {
                id: params.sizeId,

            }
        });

        return NextResponse.json(size);
    } catch (error) {
        console.error('[SIZE_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string, sizeId: string } }) {
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
        if (!params.sizeId) {
            return new NextResponse("size id is required", { status: 400 });
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

        const size = await prismadb.size.updateMany({
            where: {
                id: params.sizeId
            },
            data: {
                name,
                value
            }
        });

        return NextResponse.json(size);
    } catch (error) {
        console.error('[SIZE_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string, sizeId: string } }) {
    try {


        if (!params.sizeId) {
            return new NextResponse("size Id is required", { status: 400 });
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

        const size = await prismadb.size.deleteMany({
            where: {
                id: params.sizeId,

            }
        });

        return NextResponse.json(size);
    } catch (error) {
        console.error('[SIZE_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
