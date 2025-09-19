import React, { useState, useCallback } from 'react'

export const SmartLightControls = ({ device, onUpdate }) => {
  const [localControls, setLocalControls] = useState(device?.lightControls || {})

  // Validate required props and data
  if (!device?.lightControls || !device?.lightSpecs) {
    return null
  }

  const handleToggle = useCallback(() => {
    const newState = { ...localControls, isOn: !localControls.isOn }
    setLocalControls(newState)
    onUpdate?.({ lightControls: newState })
  }, [localControls, onUpdate])

  const handleBrightnessChange = useCallback((value) => {
    const newState = { ...localControls, brightness: parseInt(value) }
    setLocalControls(newState)
    onUpdate?.({ lightControls: newState })
  }, [localControls, onUpdate])

  const handleTemperatureChange = useCallback((value) => {
    const temp = parseInt(value)
    const newState = {
      ...localControls,
      colorTemperature: temp,
      colorName: getTemperatureName(temp),
      rgbColor: temperatureToRGB(temp)
    }
    setLocalControls(newState)
    onUpdate?.({ lightControls: newState })
  }, [localControls, onUpdate])

  const getTemperatureName = (temp) => {
    if (temp <= 2700) return 'Warm White'
    if (temp <= 4000) return 'Soft White'
    if (temp <= 5000) return 'Cool White'
    return 'Daylight'
  }

  const temperatureToRGB = (temp) => {
    // Simplified color temperature to RGB conversion
    if (temp <= 2700) return '#FFE4B5'
    if (temp <= 4000) return '#FFF8DC'
    if (temp <= 5000) return '#F5F5DC'
    return '#E6E6FA'
  }


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Light Controls
        </h3>
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            localControls.isOn ? 'bg-blue-600' : 'bg-slate-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              localControls.isOn ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Brightness Slider */}
      {localControls.isOn && device.lightSpecs.dimmable && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Brightness</span>
            <span className="text-sm font-medium text-slate-900">{localControls.brightness}%</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={localControls.brightness}
            onChange={(e) => handleBrightnessChange(e.target.value)}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${localControls.brightness}%, #e2e8f0 ${localControls.brightness}%, #e2e8f0 100%)`
            }}
          />
        </div>
      )}

      {/* Color Temperature Control */}
      {localControls.isOn && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Temperature</span>
            <span className="text-sm font-medium text-slate-900">
              {localControls.colorName} ({localControls.colorTemperature}K)
            </span>
          </div>
          <input
            type="range"
            min={device.lightSpecs.colorTempRange.min}
            max={device.lightSpecs.colorTempRange.max}
            step="100"
            value={localControls.colorTemperature}
            onChange={(e) => handleTemperatureChange(e.target.value)}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #fbbf24 0%, #fff8dc 50%, #e6e6fa 100%)`
            }}
          />
        </div>

      )}
    </div>
  )
}