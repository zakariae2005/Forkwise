export interface Menu {
    id: string
    name: string
    price: number
    description: string
    category: string
    imageUrl: string
    restaurantId: string
    createdAt: string
    updatedAt: string
}

export type MenuPayload = {
    name: string
    price: number
    description?: string
    category?: string
    imageUrl?: string
}

export type MenuData = {
    name: string
    price: number
    description: string
    category: string
    imageUrl: string
}