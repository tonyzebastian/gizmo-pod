import React from 'react'
import { LayoutGrid, Map } from 'lucide-react'
import { useAppNavigation } from '../../hooks/useAppNavigation'

export const DevicesHeader = ({ viewMode, setViewMode }) => {
  const { isSidebarCollapsed } = useAppNavigation()

  return (
    <div
      className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between fixed top-0 right-0 z-10 transition-all duration-300"
      style={{
        left: isSidebarCollapsed ? '4rem' : '16rem' // 64px or 256px to match sidebar widths
      }}
    >
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">Devices</h2>

      {/* View Mode Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setViewMode('spatial')}
          className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors ${
            viewMode === 'spatial'
              ? 'bg-primary-500 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Map size={14} className="md:w-4 md:h-4" />
          <span className="hidden sm:inline">Spatial</span>
          <span className="sm:hidden">S</span>
        </button>
        <button
          onClick={() => setViewMode('grid')}
          className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors ${
            viewMode === 'grid'
              ? 'bg-primary-500 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <LayoutGrid size={14} className="md:w-4 md:h-4" />
          <span className="hidden sm:inline">Grid</span>
          <span className="sm:hidden">G</span>
        </button>
      </div>
    </div>
  )
}