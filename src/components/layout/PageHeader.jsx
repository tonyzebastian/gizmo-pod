import React from 'react'
import { useAppNavigation } from '../../hooks/useAppNavigation'

export const PageHeader = ({ title, children }) => {
  const { isSidebarCollapsed } = useAppNavigation()

  return (
    <div
      className="bg-white border-b border-slate-200 px-4 h-16 flex items-center justify-between fixed top-0 right-0 z-10 transition-all duration-300"
      style={{
        left: isSidebarCollapsed ? '4rem' : '15rem' // 64px or 240px to match sidebar widths
      }}
    >
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>

      {children && (
        <div className="flex items-center gap-4">
          {children}
        </div>
      )}
    </div>
  )
}