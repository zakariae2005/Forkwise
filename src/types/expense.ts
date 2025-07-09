export interface Expense {
    id: string
    value: number
    note: string
    date: Date
    restaurantId: string
    createdAt: string
    updatedAt: string
}

export type ExpensePayoad = {
    value: number
    note?: string
    date: Date
}

export type ExpenseData = {
    value: number
    note: string
    date: Date
}