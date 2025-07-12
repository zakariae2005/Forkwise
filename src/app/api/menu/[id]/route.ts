import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// GET single menu item
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
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

        const menu = await prisma.menuItem.findFirst({
            where: { 
                id: id,
                restaurantId: user.restaurant[0].id 
            }
        })

        if (!menu) {
            return NextResponse.json({ message: 'Menu item not found' }, { status: 404 })
        }

        return NextResponse.json(menu)
    } catch (error) {
        console.error('Error fetching menu item:', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}

// PUT - Update menu item
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
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

        // Check if menu item exists and belongs to user's restaurant
        const existingMenu = await prisma.menuItem.findFirst({
            where: { 
                id: id,
                restaurantId: user.restaurant[0].id 
            }
        })

        if (!existingMenu) {
            return NextResponse.json({ message: 'Menu item not found' }, { status: 404 })
        }

        const updatedMenu = await prisma.menuItem.update({
            where: { id: id },
            data: {
                name,
                price: parseFloat(price.toString()),
                description: description || null,
                category: category || null,
                imageUrl: imageUrl || null,
            }
        })

        return NextResponse.json(updatedMenu)
    } catch (error) {
        console.error('Menu update error:', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}

// DELETE menu item
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const session = await getServerSession(authOptions)
        if (!session?.user.email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { restaurant: true }
        })

        if (!user || !user.restaurant.length) {
            return NextResponse.json({ message: 'User or restaurant not found' }, { status: 404 })
        }

        // Check if menu item exists and belongs to user's restaurant
        const existingMenu = await prisma.menuItem.findFirst({
            where: { 
                id: id,
                restaurantId: user.restaurant[0].id 
            }
        })

        if (!existingMenu) {
            return NextResponse.json({ message: 'Menu item not found' }, { status: 404 })
        }

        await prisma.menuItem.delete({
            where: { id: id }
        })

        return NextResponse.json({ message: 'Menu item deleted successfully' })
    } catch (error) {
        console.error('Menu deletion error:', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}