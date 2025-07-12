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

        const promotion = await prisma.promotion.findFirst({
            where: { 
                id: id,
                restaurantId: user.restaurant[0].id 
            }
        })

        if (!promotion) {
            return NextResponse.json({ message: 'Promotion not found' }, { status: 404 })
        }

        return NextResponse.json(promotion)
    } catch (error) {
        console.error('Error fetching promotion item:', error)
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
        const { message, active } = body

        if (!message || !active) {
            return NextResponse.json({ 
                message: "Missing required fields: message and active are required" 
            }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { restaurant: true }
        })

        if (!user || !user.restaurant.length) {
            return NextResponse.json({ message: 'User or restaurant not found' }, { status: 404 })
        }

        // Check if promotion item exists and belongs to user's restaurant
        const existingPromotion = await prisma.promotion.findFirst({
            where: { 
                id: id,
                restaurantId: user.restaurant[0].id 
            }
        })

        if (!existingPromotion) {
            return NextResponse.json({ message: 'Promotion not found' }, { status: 404 })
        }

        const updatedPromotion = await prisma.promotion.update({
            where: { id: id },
            data: {
                message,
                active
            }
        })

        return NextResponse.json(updatedPromotion)
    } catch (error) {
        console.error('Promotion update error:', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}

// DELETE promotion item
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

        // Check if promotion item exists and belongs to user's restaurant
        const existingPromotion = await prisma.promotion.findFirst({
            where: { 
                id: id,
                restaurantId: user.restaurant[0].id 
            }
        })

        if (!existingPromotion) {
            return NextResponse.json({ message: 'Promotion not found' }, { status: 404 })
        }

        await prisma.promotion.delete({
            where: { id: id }
        })

        return NextResponse.json({ message: 'Promotion item deleted successfully' })
    } catch (error) {
        console.error('Promotion deletion error:', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}