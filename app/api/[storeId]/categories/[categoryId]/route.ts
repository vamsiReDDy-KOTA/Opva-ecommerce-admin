import { auth } from "@/auth"
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const config = {
    runtime: 'nodejs',
};

export async function GET(req: Request, { params }: { params: { categoryId: string } }) {
    try {


        if (!params.categoryId) {
            return new NextResponse("category Id is required", { status: 400 });
        }


        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,

            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error('[CATEGORY_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string, categoryId: string } }) {
    try {
        console.log(req)
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
        if (!params.categoryId) {
            return new NextResponse("category id is required", { status: 400 });
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

        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryId
            },
            data: {
                name,
                billboardId
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error('[CATEGORY_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string, categoryId: string } }) {
    try {


        if (!params.categoryId) {
            return new NextResponse("category Id is required", { status: 400 });
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

        const category = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId,

            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error('[CATEGORY_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
