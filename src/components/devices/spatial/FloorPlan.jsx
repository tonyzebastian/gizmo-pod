import React from 'react'
import { useCoordinates } from '../../../hooks/useCoordinates'
import { DeviceNode } from './DeviceNode'
import { DEVICES } from '../../../data/mockDevices'
import { ROOMS } from '../../../data/mockRooms'
import { useDeviceSelection } from '../../../hooks/useDeviceSelection'
import floorPlanImage from '../../../assets/floor_plan.png'

export const FloorPlan = ({ onDeviceSelect }) => {
  const { selectedDevice } = useDeviceSelection()
  // Calculate available viewport dimensions excluding header height
  const availableHeight = window.innerHeight - 80 // Account for fixed header
  const canvasWidth = selectedDevice
    ? window.innerWidth * 0.6
    : window.innerWidth
  const canvasHeight = availableHeight

  const {
    floorPlanX,
    floorPlanY,
    floorPlanWidth,
    floorPlanHeight,
    deviceToCanvasCoords,
    needsScroll
  } = useCoordinates(canvasWidth, canvasHeight)

  // Calculate the SVG dimensions - ensure it fills viewport and accommodates floor plan
  const svgWidth = needsScroll ? Math.max(canvasWidth, floorPlanWidth + 100) : canvasWidth
  const svgHeight = Math.max(canvasHeight, needsScroll ? floorPlanHeight + 100 : canvasHeight)

  return (
    <svg
      data-testid="floor-plan-svg"
      width={svgWidth}
      height={svgHeight}
      className="absolute top-0 left-0"
      style={{ minHeight: '100%', background: 'transparent' }}
    >
      {/* Background is now handled by SpatialView component */}

      {/* Layer 1: Floor Plan (responsive size) */}
      <image
        data-testid="floor-plan-image"
        href={floorPlanImage}
        x={floorPlanX}
        y={floorPlanY}
        width={floorPlanWidth}
        height={floorPlanHeight}
      />

      {/* Layer 2: Room Boundaries (hidden) */}
      <g data-testid="room-boundaries" style={{ display: 'none' }}>
        {ROOMS.map(room => (
          <rect
            key={room.id}
            data-testid={`room-boundary-${room.id}`}
            x={floorPlanX + (room.bounds.x * floorPlanWidth)}
            y={floorPlanY + (room.bounds.y * floorPlanHeight)}
            width={room.bounds.width * floorPlanWidth}
            height={room.bounds.height * floorPlanHeight}
            fill="none"
            stroke="#e5e7eb"
            strokeDasharray="5,5"
            strokeWidth="2"
            opacity="0.7"
          />
        ))}
      </g>

      {/* Layer 3: Device Icons */}
      <g data-testid="devices-group">
        {DEVICES.map(device => {
          const coords = deviceToCanvasCoords(device)
          return (
            <DeviceNode
              key={device.id}
              device={device}
              x={coords.x}
              y={coords.y}
              isSelected={selectedDevice?.id === device.id}
              onSelect={() => onDeviceSelect(device)}
              canvasWidth={canvasWidth}
              showTooltipOnly={false}
            />
          )
        })}
      </g>

      {/* Layer 4: Tooltips (always on top) */}
      <g data-testid="tooltips-group">
        {DEVICES.map(device => {
          const coords = deviceToCanvasCoords(device)
          return (
            <DeviceNode
              key={`tooltip-${device.id}`}
              device={device}
              x={coords.x}
              y={coords.y}
              isSelected={selectedDevice?.id === device.id}
              onSelect={() => onDeviceSelect(device)}
              canvasWidth={canvasWidth}
              showTooltipOnly={true}
            />
          )
        })}
      </g>
    </svg>
  )
}