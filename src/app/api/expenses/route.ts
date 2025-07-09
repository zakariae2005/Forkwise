import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user.email) {
            return NextResponse.json({ message: 'Unauthorized'})
        }
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { restaurant: true }
        })

        if (!user || !user.restaurant.length) {
            return NextResponse.json({ message: 'User or Restaurant not found'}, { status: 404 })
        }
        const expenses = await prisma.expense.findMany({
            where: {
                restaurantId: user.restaurant[0].id
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(expenses)
    } catch (error) {
      console.error('Error fetching expenses:', error)
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { value, note, date } = body

        if (!value || !date) {
            return NextResponse.json({ message: "Missing required fields: value, date are required"}, { status: 404})
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { restaurant: true }
            })

        if (!user || !user.restaurant.length) {
            return NextResponse.json({ message: 'User or restaurant not found' }, { status: 404 })
        }

        const expense = await prisma.expense.create({
            data: {
                value: parseFloat(value),
                note,
                date,
                restaurantId: user.restaurant[0].id
            }
        })
        return NextResponse.json(expense, { status: 201 })
    } catch (error) {
       console.error('Expens creation error:', error)
       return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}