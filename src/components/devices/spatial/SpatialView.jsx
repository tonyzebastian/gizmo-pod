import React from 'react'
import { FloorPlan } from './FloorPlan'
import { DeviceSidebar } from '../shared/DeviceSidebar'
import { useDeviceSelection } from '../../../hooks/useDeviceSelection'
import backgroundImage from '../../../assets/background.png'

export const SpatialView = () => {
  const { selectedDevice, selectDevice, clearSelection, toggleDevice } = useDeviceSelection()

  const handleDeviceSelect = (device) => {
    toggleDevice(device)
  }

  const handleClearSelection = () => {
    clearSelection()
  }

  return (
    <div className="relative w-full h-full flex">
      {/* Main Floor Plan Area */}
      <div
        className={`relative transition-all duration-300 overflow-auto ${
          selectedDevice ? 'w-3/5 md:w-2/3 lg:w-3/5' : 'w-full'
        }`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'local'
        }}
      >
        {/* Floor Plan Layer */}
        <div className="relative z-10">
          <FloorPlan
            onDeviceSelect={handleDeviceSelect}
          />
        </div>

      </div>

      {/* Device Sidebar */}
      {selectedDevice && (
        <DeviceSidebar
          device={selectedDevice}
          onClose={handleClearSelection}
        />
      )}
    </div>
  )
}