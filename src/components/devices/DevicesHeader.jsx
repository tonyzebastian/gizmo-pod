import React from 'react'
import { Plus, MapPin } from 'lucide-react'
import { PageHeader } from '../layout/PageHeader'

export const DevicesHeader = ({ onAddDevice, onAddZone }) => {
  return (
    <PageHeader title="Devices">
      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onAddZone}
          className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-300"
        >
          <MapPin size={14} className="md:w-4 md:h-4" />
          <span className="hidden sm:inline">Add Zone</span>
          <span className="sm:hidden">Zone</span>
        </button>
        <button
          onClick={onAddDevice}
          className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors bg-slate-900 text-white hover:bg-slate-800"
        >
          <Plus size={14} className="md:w-4 md:h-4" />
          <span className="hidden sm:inline">Add Device</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </PageHeader>
  )
}