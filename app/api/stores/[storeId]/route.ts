import { auth } from "@/auth"
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const config = {
    runtime: 'nodejs',
};

export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
    try {
        console.log(req)
        const rawBody = await req.text();
        console.log("Raw body:", rawBody);

        const body = rawBody ? JSON.parse(rawBody) : {};
        const { name } = body;

        console.log("Parsed name:", name);

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId: '2'
            },
            data: {
                name
            }
        });

        return NextResponse.json(store);
    } catch (error) {
        console.error('[STORES_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string } }) {
    try {
        console.log("params.storeId", params.storeId);

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId: '2' // You may want to dynamically pass the userId instead of hardcoding '2'
            }
        });

        if (!store || store.count === 0) {
            return new NextResponse("Store not found or no store deleted", { status: 404 });
        }

        return NextResponse.json({ message: 'Store deleted successfully', store });
    } catch (error) {
        console.error('[STORES_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
