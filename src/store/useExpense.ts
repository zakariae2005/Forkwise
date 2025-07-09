import { Expense, ExpensePayoad } from '@/types/expense'
import { create } from 'zustand'

type ExpenseState = {
  expenses: Expense[]
  isLoading: boolean
  error: string | null
  
  // Actions
  setExpenses: (expenses: Expense[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // API calls
  fetchExpenses: () => Promise<void>
  createExpense: (expense: ExpensePayoad) => Promise<void>
}

export const useExpense = create<ExpenseState>((set) => ({
  expenses: [],
  isLoading: false,
  error: null,

  setExpenses: (expenses) => set({ expenses }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchExpenses: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/expenses')
      if (!response.ok) {
        throw new Error('Failed to fetch expenses')
      }
      const data = await response.json()
      // Ensure we always set an array
      const expenses = Array.isArray(data) ? data : []
      set({ expenses, isLoading: false })
    } catch (error) {
      console.error('Error fetching expenses:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error', 
        isLoading: false,
        expenses: [] // Ensure expenses is always an array
      })
    }
  },

  createExpense: async (expense: ExpensePayoad) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create expense')
      }
      
      const newExpense = await response.json()
      set(state => ({ 
        expenses: Array.isArray(state.expenses) ? [newExpense, ...state.expenses] : [newExpense], 
        isLoading: false 
      }))
    } catch (error) {
      console.error('Error creating expense:', error)
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false })
      throw error
    }
  },
}))