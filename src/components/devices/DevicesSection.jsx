import React from 'react'
import { SpatialView } from './spatial/SpatialView'
import { DevicesHeader } from './DevicesHeader'

export const DevicesSection = () => {
  const handleAddDevice = () => {
    console.log('Add Device clicked')
    // TODO: Implement add device functionality
  }

  const handleAddZone = () => {
    console.log('Add Zone clicked')
    // TODO: Implement add zone functionality
  }

  return (
    <div className="h-screen flex flex-col">
      <DevicesHeader
        onAddDevice={handleAddDevice}
        onAddZone={handleAddZone}
      />

      {/* Spatial View Content */}
      <div className="flex-1 overflow-hidden sm:overflow-auto">
        <SpatialView />
      </div>
    </div>
  )
}