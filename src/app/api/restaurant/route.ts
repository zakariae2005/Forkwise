import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            return NextResponse.json({ message: 'Unauthorized'})
        }

        const restaurants = await prisma.restaurant.findMany({
            where: {
                user: {
                    email: session.user.email,
                }
            }
        })
        return NextResponse.json(restaurants)

    
}

export async function POST(req: Request){
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            return NextResponse.json( { message: 'Unauthorized'})
        }

        const body = await req.json()

        const {name, slug, logoUrl, bannerImageUrl, primaryColor, whatsappNumber, phoneNumber, location, instagramUrl, welcomeMessage, layoutType} = body

        if (!name || !slug ) {
            return NextResponse.json({ message: "Missing required fields"}, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 })  
        }

        const restaurant = await prisma.restaurant.create({
            data: {
               name, 
               slug,
               logoUrl,
               bannerImageUrl,
               primaryColor,
               whatsappNumber,
               phoneNumber,
               location,
               instagramUrl,
               layoutType,
               welcomeMessage,
               userId: user.id
            }
        })

        return NextResponse.json(restaurant)
    } catch (error) {
        console.error('Restaurant creation error:', error)
        return NextResponse.json(
        { message: 'Internal server error' },
        { status: 500 }
        )
    }
}