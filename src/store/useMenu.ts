import { Menu, MenuPayload } from '@/types/menu'
import { create } from 'zustand'

type MenuState = {
  menus: Menu[]
  isLoading: boolean
  error: string | null
  
  // Actions
  setMenus: (menus: Menu[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // API calls
  fetchMenus: () => Promise<void>
  createMenu: (menu: MenuPayload) => Promise<void>
  updateMenu: (id: string, menu: MenuPayload) => Promise<void>
  deleteMenu: (id: string) => Promise<void>
}

export const useMenu = create<MenuState>((set) => ({
  menus: [],
  isLoading: false,
  error: null,

  setMenus: (menus) => set({ menus }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchMenus: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/menu')
      if (!response.ok) {
        throw new Error('Failed to fetch menus')
      }
      const data = await response.json()
      // Ensure we always set an array
      const menus = Array.isArray(data) ? data : []
      set({ menus, isLoading: false })
    } catch (error) {
      console.error('Error fetching menus:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error', 
        isLoading: false,
        menus: [] 
      })
    }
  },

  createMenu: async (menu: MenuPayload) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menu),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create menu')
      }
      
      const newMenu = await response.json()
      set(state => ({ 
        menus: Array.isArray(state.menus) ? [newMenu, ...state.menus] : [newMenu], 
        isLoading: false 
      }))
    } catch (error) {
      console.error('Error creating menu:', error)
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false })
      throw error
    }
  },

  updateMenu: async (id: string, menu: MenuPayload) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/menu/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menu),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update menu')
      }
      
      const updatedMenu = await response.json()
      set(state => ({ 
        menus: state.menus.map(m => m.id === id ? updatedMenu : m), 
        isLoading: false 
      }))
    } catch (error) {
      console.error('Error updating menu:', error)
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false })
      throw error
    }
  },

  deleteMenu: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to delete menu')
      }
      
      set(state => ({ 
        menus: state.menus.filter(m => m.id !== id), 
        isLoading: false 
      }))
    } catch (error) {
      console.error('Error deleting menu:', error)
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false })
      throw error
    }
  },
}))