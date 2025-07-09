// store/useIncome.ts

import { Income, IncomePayoad } from '@/types/income'
import { create } from 'zustand'

type IncomeState = {
  incomes: Income[]
  isLoading: boolean
  error: string | null
  
  // Actions
  setIncome: (incomes: Income[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // API calls
  fetchIncomes: () => Promise<void>
  createIncome: (income: IncomePayoad) => Promise<void>
  
}

export const useIncome = create<IncomeState>((set) => ({
  incomes: [],
  isLoading: false,
  error: null,

  setIncome: (incomes) => set({ incomes }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchIncomes: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/income')
      if (!response.ok) {
        throw new Error('Failed to fetch incomes')
      }
      const incomes = await response.json()
      set({ incomes, isLoading: false })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false })
    }
  },

  createIncome: async (income: IncomePayoad) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/income', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(income),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create income')
      }
      
      const newIncome = await response.json()
      set(state => ({ 
        incomes: [...state.incomes, newIncome], 
        isLoading: false 
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false })
      throw error
    }
  },
}))
