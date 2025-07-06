import { ReastaurantPaylod } from "@/types";
import { create } from "zustand";

type RestaurantState = {
    restaurants: ReastaurantPaylod[]
    setRestaurants: (restaurants: ReastaurantPaylod[]) => void
}

export const useRestaurant = create<RestaurantState>((set) => ({
    restaurants: [],
    setRestaurants: (restaurants => set({ restaurants }))
}))