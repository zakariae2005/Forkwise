import { Income, IncomePayoad } from '@/types/income'
import { create } from 'zustand'

type IncomeState = {
  incomes: Income[]
  isLoading: boolean
  error: string | null
  
  // Actions
  setIncomes: (incomes: Income[]) => void
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

  setIncomes: (incomes) => set({ incomes }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchIncomes: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/income')
      if (!response.ok) {
        throw new Error('Failed to fetch incomes')
      }
      const data = await response.json()
      // Ensure we always set an array
      const incomes = Array.isArray(data) ? data : []
      set({ incomes, isLoading: false })
    } catch (error) {
      console.error('Error fetching incomes:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error', 
        isLoading: false,
        incomes: [] // Ensure incomes is always an array
      })
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
        incomes: Array.isArray(state.incomes) ? [newIncome, ...state.incomes] : [newIncome], 
        isLoading: false 
      }))
    } catch (error) {
      console.error('Error creating income:', error)
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false })
      throw error
    }
  },
}))