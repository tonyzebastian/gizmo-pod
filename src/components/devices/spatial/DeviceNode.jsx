import React, { useState } from 'react'
import { DEVICE_ICONS } from '../../../data/mockDevices'

export const DeviceNode = ({ device, x, y, isSelected, onSelect, canvasWidth, showTooltipOnly = false }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  // Check if battery should override core vital
  const shouldShowBattery = device.battery && device.battery.level < 20

  // Get better vital representation
  const getVitalRepresentation = (device) => {
    if (shouldShowBattery) {
      return `🔋 ${device.battery.level}%`
    }

    switch (device.type) {
      case 'light':
        return device.status === 'active' ? '🟢 On' : '⚫ Off'
      case 'speaker':
        return device.status === 'active' ? '🟢 Playing' : '⚫ Off'
      case 'thermostat':
        return `🌡️ ${device.coreVital.value}`
      case 'camera':
      case 'camera_front':
        return device.status === 'active' ? '🟢 Recording' : '⚫ Off'
      case 'doorlock':
        return device.coreVital.value === 'Locked' ? '🔒 Locked' : '🔓 Unlocked'
      case 'smartplug':
        return device.status === 'active' ? '🟢 On' : '⚫ Off'
      case 'vacuum':
        return device.status === 'active' ? '🟢 Active' : '🔴 Offline - Needs debugging'
      case 'energymonitor':
        return `⚡ ${device.coreVital.value}`
      case 'gizmopod':
        return `🟢 ${device.coreVital.value}`
      default:
        return device.status === 'active' ? '🟢 Active' : '⚫ Inactive'
    }
  }

  const displayVital = getVitalRepresentation(device)


  // Responsive sizing based on canvas width
  const isMobile = canvasWidth < 768
  const scale = isMobile ? 0.8 : 1

  const selectionRadius = 35 * scale
  const iconSize = 50 * scale  // Increased from 18 to 40

  // Get the icon path for this device type
  const iconPath = DEVICE_ICONS[device.type] || DEVICE_ICONS.gizmopod

  // If this is tooltip-only render, only show tooltip when hovered
  if (showTooltipOnly) {
    return (
      <>
        {/* Invisible hover area */}
        <g
          transform={`translate(${x}, ${y})`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          style={{ cursor: 'pointer' }}
          onClick={onSelect}
        >
          <circle
            r={selectionRadius}
            fill="transparent"
            data-testid={`hover-area-${device.id}`}
          />
        </g>

        {/* Tooltip */}
        {showTooltip && (
          <g transform={`translate(${x + 30}, ${y - 20})`}>
            {/* Drop shadow */}
            <rect
              x="2"
              y="2"
              width="160"
              height={shouldShowBattery ? "75" : (device.type === 'thermostat' ? "65" : "55")}
              rx="8"
              fill="black"
              opacity="0.1"
            />
            {/* Main tooltip background */}
            <rect
              x="0"
              y="0"
              width="160"
              height={shouldShowBattery ? "75" : (device.type === 'thermostat' ? "65" : "55")}
              rx="8"
              fill="white"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            {/* Device name */}
            <text
              x="12"
              y="18"
              fontSize="12"
              fill="#1f2937"
              fontWeight="600"
            >
              {device.name}
            </text>
            {/* Device vital with improved representation */}
            <text
              x="12"
              y="35"
              fontSize="10"
              fill="#6b7280"
            >
              {displayVital}
            </text>
            {/* Additional info for some devices */}
            {device.type === 'thermostat' && !shouldShowBattery && (
              <text
                x="12"
                y="50"
                fontSize="9"
                fill="#9ca3af"
              >
                Target: {device.coreVital.value.split(' → ')[1] || device.coreVital.value}
              </text>
            )}
            {/* Battery warning if needed */}
            {shouldShowBattery && (
              <text
                x="12"
                y="52"
                fontSize="10"
                fill="#ef4444"
                fontWeight="500"
              >
                Low Battery!
              </text>
            )}
          </g>
        )}
      </>
    )
  }

  // Regular device icon render
  return (
    <g
      data-testid={`device-node-${device.id}`}
      transform={`translate(${x}, ${y})`}
      onClick={onSelect}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Selection background */}
      {isSelected && (
        <circle
          data-testid="selection-background"
          r={selectionRadius}
          fill="white"
          stroke="#e5e7eb"
          strokeWidth={2 * scale}
          opacity="0.95"
        />
      )}

      {/* Pulsating warning background for vacuum cleaner */}
      {device.type === 'vacuum' && (
        <circle
          r={selectionRadius}
          fill="#ef4444"
          stroke="none"
          opacity="0.15"
          className="animate-pulse"
        />
      )}

      {/* Device icon using custom PNG */}
      <image
        x={showTooltip ? -(iconSize * 1.1)/2 : -iconSize/2}
        y={showTooltip ? -(iconSize * 1.1)/2 : -iconSize/2}
        width={showTooltip ? iconSize * 1.1 : iconSize}
        height={showTooltip ? iconSize * 1.1 : iconSize}
        href={iconPath}
        data-testid="device-icon"
        style={{
          filter: showTooltip
            ? 'drop-shadow(1px 0 0 #3b82f6) drop-shadow(-1px 0 0 #3b82f6) drop-shadow(0 1px 0 #3b82f6) drop-shadow(0 -1px 0 #3b82f6)'
            : 'drop-shadow(1px 0 0 #1a1a1a) drop-shadow(-1px 0 0 #1a1a1a) drop-shadow(0 1px 0 #1a1a1a) drop-shadow(0 -1px 0 #1a1a1a)',
          transition: 'width 0.2s ease-in-out, height 0.2s ease-in-out, filter 0.2s ease-in-out'
        }}
      />
    </g>
  )
}