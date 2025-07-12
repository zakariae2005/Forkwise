import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user.email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { restaurant: true }
        })
        if (!user || !user.restaurant.length) {
            return NextResponse.json({ message: 'User or Restaurant not found' }, { status: 404 })
        }
        const menus = await prisma.menuItem.findMany({
            where: { restaurantId: user.restaurant[0].id },
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(menus)
    } catch (error) {
        console.error('Error fetching menus:', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user.email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }
        const body = await req.json()
        const { name, price, description, category, imageUrl } = body
        if (!name || !price) {
            return NextResponse.json({ 
                message: "Missing required fields: name and price are required" 
            }, { status: 400 })
        }
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { restaurant: true }
        })

        if (!user || !user.restaurant.length) {
            return NextResponse.json({ message: 'User or restaurant not found' }, { status: 404 })
        }
        const menu = await prisma.menuItem.create({
            data: {
                name,
                price: parseFloat(price.toString()),
                description: description || null,
                category: category || null,
                imageUrl: imageUrl || null,
                restaurantId: user.restaurant[0].id       
            }
        })
        return NextResponse.json(menu, { status: 201 })
    } catch (error) {
        console.error('Menu creation error:', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}