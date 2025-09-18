import React, { useState } from 'react'
import { FloorPlan } from './FloorPlan'

export const SpatialView = () => {
  const [selectedDevice, setSelectedDevice] = useState(null)

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device)
  }

  const handleClearSelection = () => {
    setSelectedDevice(null)
  }

  return (
    <div
      className="relative w-full h-full overflow-auto"
      style={{
        backgroundImage: 'url(/src/assets/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'local'
      }}
    >

      {/* Floor Plan Layer */}
      <div className="relative z-10">
        <FloorPlan
          selectedDevice={selectedDevice}
          onDeviceSelect={handleDeviceSelect}
        />
      </div>

      {/* Clear selection overlay when device is selected */}
      {selectedDevice && (
        <div
          className="absolute inset-0 bg-black bg-opacity-20 cursor-pointer z-20"
          onClick={handleClearSelection}
          style={{ pointerEvents: 'auto' }}
        />
      )}

      {/* Floor plan takes up remaining space or 60% when device selected */}
      <div
        className={`relative transition-all duration-300 ${
          selectedDevice ? 'w-3/5' : 'w-full'
        }`}
        style={{ pointerEvents: 'none' }}
      >
        {/* This div maintains the layout but FloorPlan renders absolutely */}
      </div>
    </div>
  )
}