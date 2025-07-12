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
        const promotions = await prisma.promotion.findMany({
            where: { restaurantId: user.restaurant[0].id },
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(promotions)
    } catch (error) {
        console.error('Error fetching promotions:', error)
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
        const { message, active } = body
        
        if (!message || active === undefined) {
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
        
        const promotion = await prisma.promotion.create({
            data: {
                message,
                active: Boolean(active),
                restaurantId: user.restaurant[0].id       
            }
        })
        
        return NextResponse.json(promotion, { status: 201 })
    } catch (error) {
        console.error('Promotion creation error:', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}