import { create } from 'zustand'

export const useAppNavigation = create((set) => ({
  activeSection: 'overview',
  isSidebarCollapsed: false,
  setActiveSection: (section) => set({ activeSection: section }),
  toggleSidebar: () => set((state) => ({
    isSidebarCollapsed: !state.isSidebarCollapsed
  }))
}))