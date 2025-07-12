export interface Promotion {
    id: string
    message: string
    active: boolean
    restaurantId: string
    createdAt: string
    updatedAt: string
}

export type PromotionPayload = {
    message: string
    active: boolean
}

export type PromotionData = {
    message: string
    active: number
}