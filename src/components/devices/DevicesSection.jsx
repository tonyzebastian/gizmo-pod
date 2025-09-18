import React, { useState } from 'react'
import { SpatialView } from './spatial/SpatialView'
import { DevicesHeader } from './DevicesHeader'

export const DevicesSection = () => {
  const [viewMode, setViewMode] = useState('spatial') // 'spatial' or 'grid'

  return (
    <div className="h-screen flex flex-col">
      <DevicesHeader viewMode={viewMode} setViewMode={setViewMode} />

      {/* View Content - scroll on small screens, hidden on larger screens */}
      <div className="flex-1 overflow-hidden sm:overflow-auto">
        {viewMode === 'spatial' ? (
          <SpatialView />
        ) : (
          <div className="h-full overflow-auto p-6">
            <div className="text-gray-500">Grid View - Coming Soon</div>
          </div>
        )}
      </div>
    </div>
  )
}