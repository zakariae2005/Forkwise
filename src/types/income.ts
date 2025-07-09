export interface Income {
    id: string
    value: number
    note: string
    date: Date
    restaurantId: string
    createdAt: string
    updatedAt: string
}

export type IncomePayoad = {
    value: number
    note?: string
    date: Date
}

export type IncomeData = {
    value: number
    note: string
    date: Date
}