import React, { useState } from 'react'
import {
  Home,
  Lightbulb,
  Volume2,
  Thermometer,
  Camera,
  Wind
} from 'lucide-react'
import { DEVICE_ICONS, DEVICE_COLORS, DEVICE_ICON_COLORS } from '../../../data/mockDevices'

export const DeviceNode = ({ device, x, y, isSelected, onSelect, canvasWidth }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  // Check if battery should override core vital
  const shouldShowBattery = device.battery && device.battery.level < 20
  const displayVital = shouldShowBattery
    ? `Battery ${device.battery.level}%`
    : device.coreVital.value

  const deviceColor = DEVICE_COLORS[device.type] || '#ffffff'
  const iconColor = DEVICE_ICON_COLORS[device.type] || '#6b7280'
  const statusColor = device.status === 'active' ? '#10b981' : '#6b7280'

  // Responsive sizing based on canvas width
  const isMobile = canvasWidth < 768
  const scale = isMobile ? 0.8 : 1

  const selectionRadius = 35 * scale
  const statusRadius = 28 * scale
  const deviceRadius = 25 * scale
  const iconSize = 18 * scale

  // Icon component mapping
  const iconComponents = {
    Home,
    Lightbulb,
    Volume2,
    Thermometer,
    Camera,
    Wind
  }

  const IconComponent = iconComponents[DEVICE_ICONS[device.type]] || Home

  return (
    <>
      <g
        data-testid={`device-node-${device.id}`}
        transform={`translate(${x}, ${y})`}
        onClick={onSelect}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{ cursor: 'pointer' }}
      >
        {/* Selection ring */}
        {isSelected && (
          <circle
            data-testid="selection-ring"
            r={selectionRadius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={3 * scale}
          />
        )}

        {/* Status ring */}
        <circle
          data-testid="status-ring"
          r={statusRadius}
          fill="none"
          stroke={statusColor}
          strokeWidth={3 * scale}
        />

        {/* Device background - white */}
        <circle
          data-testid="device-background"
          r={deviceRadius}
          fill={deviceColor}
          stroke="#e5e7eb"
          strokeWidth="1"
        />

        {/* Device icon using Lucide React */}
        <foreignObject
          x={-iconSize/2}
          y={-iconSize/2}
          width={iconSize}
          height={iconSize}
        >
          <IconComponent
            size={iconSize}
            color={iconColor}
            data-testid="device-icon"
          />
        </foreignObject>
      </g>

      {/* Tooltip */}
      {showTooltip && (
        <g transform={`translate(${x + 40}, ${y - 30})`}>
          <rect
            x="0"
            y="0"
            width="120"
            height="60"
            rx="4"
            fill="black"
            opacity="0.8"
          />
          <text
            x="8"
            y="16"
            fontSize="12"
            fill="white"
            fontWeight="bold"
          >
            {device.name}
          </text>
          <text
            x="8"
            y="32"
            fontSize="10"
            fill="white"
          >
            {device.coreVital.label}: {device.coreVital.value}
          </text>
          {shouldShowBattery && (
            <text
              x="8"
              y="48"
              fontSize="10"
              fill="#ef4444"
            >
              Battery: {device.battery.level}%
            </text>
          )}
        </g>
      )}
    </>
  )
}