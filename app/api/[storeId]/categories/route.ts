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
        const { name, billboardId } = body;



        if (!name) {
            return new NextResponse("name is required", { status: 400 });
        }

        if (!billboardId) {
            return new NextResponse("billboard Id is required", { status: 400 });
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


        const category = await prismadb.category.create({

            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error('[CATEGORY_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {



        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const categories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId,

            }
        })
        return NextResponse.json(categories);
    } catch (error) {
        console.error('[CATEGORY_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

