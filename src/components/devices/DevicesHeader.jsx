import React from 'react'
import { LayoutGrid, Map } from 'lucide-react'
import { PageHeader } from '../layout/PageHeader'

export const DevicesHeader = ({ viewMode, setViewMode }) => {
  return (
    <PageHeader title="Devices">
      {/* View Mode Toggle */}
      <div className="flex bg-slate-100 rounded-lg p-1">
        <button
          onClick={() => setViewMode('spatial')}
          className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors ${
            viewMode === 'spatial'
              ? 'bg-primary-500 text-white'
              : 'text-slate-600 hover:text-slate-900'
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
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <LayoutGrid size={14} className="md:w-4 md:h-4" />
          <span className="hidden sm:inline">Grid</span>
          <span className="sm:hidden">G</span>
        </button>
      </div>
    </PageHeader>
  )
}