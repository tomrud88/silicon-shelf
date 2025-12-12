import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string}>}
) {
    try {
        const { id } = await params;
        const user = await prisma.user.findUnique({
            where: { id },
            include: { orders: true }
        })
        if (!user) {
            return NextResponse.json({ error: 'user does not exist in the database' }, { status: 404 })
        }
        const { passwordHash, ...userWithoutPassword } = user;
        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        console.error(error, 'error fetching product')
        return NextResponse.json({error: 'error fetching products'}, { status: 500})
    }
}