
import { Promotion, PromotionPayload } from '@/types/promotion'
import { create } from 'zustand'

type PromotionState = {
  promotions: Promotion[]
  isLoading: boolean
  error: string | null
  
  // Actions
  setPromotions: (promotions: Promotion[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // API calls
  fetchPromotions: () => Promise<void>
  createPromotion: (promotion: PromotionPayload) => Promise<void>
  updatePromotion: (id: string, promotion: PromotionPayload) => Promise<void>
  deletePromotion: (id: string) => Promise<void>
}

export const usePromotion = create<PromotionState>((set) => ({
  promotions: [],
  isLoading: false,
  error: null,

  setPromotions: (promotions) => set({ promotions }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchPromotions: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/promotion')
      if (!response.ok) {
        throw new Error('Failed to fetch promotions')
      }
      const data = await response.json()
      // Ensure we always set an array
      const promotions = Array.isArray(data) ? data : []
      set({ promotions, isLoading: false })
    } catch (error) {
      console.error('Error fetching promotions:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error', 
        isLoading: false,
        promotions: [] 
      })
    }
  },

  createPromotion: async (promotion: PromotionPayload) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/promotion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promotion),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create promotion')
      }
      
      const newPromotion = await response.json()
      set(state => ({ 
        promotions: Array.isArray(state.promotions) ? [newPromotion, ...state.promotions] : [newPromotion], 
        isLoading: false 
      }))
    } catch (error) {
      console.error('Error creating promotion:', error)
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false })
      throw error
    }
  },

  updatePromotion: async (id: string, promotion: PromotionPayload) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/promotion/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promotion),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update promotion')
      }
      
      const updatedPromotion = await response.json()
      set(state => ({ 
        promotions: state.promotions.map(m => m.id === id ? updatedPromotion : m), 
        isLoading: false 
      }))
    } catch (error) {
      console.error('Error updating promotion:', error)
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false })
      throw error
    }
  },

  deletePromotion: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/promotion/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to delete promotion')
      }
      
      set(state => ({ 
        promotions: state.promotions.filter(m => m.id !== id), 
        isLoading: false 
      }))
    } catch (error) {
      console.error('Error deleting promotion:', error)
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false })
      throw error
    }
  },
}))