import React, { useState, useCallback } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

export const ThermostatControls = ({ device, onUpdate }) => {
  const [localControls, setLocalControls] = useState(device?.thermostatControls || {})

  // Validate required props and data
  if (!device?.thermostatControls || !device?.thermostatSpecs) {
    return null
  }

  const handleToggle = useCallback(() => {
    const newState = { ...localControls, isOn: !localControls.isOn }
    setLocalControls(newState)
    onUpdate?.({ thermostatControls: newState })
  }, [localControls, onUpdate])

  const handleTempChange = useCallback((type, direction) => {
    const increment = direction === 'up' ? 1 : -1
    const newTemp = Math.max(
      device.thermostatSpecs.tempRange.min,
      Math.min(
        device.thermostatSpecs.tempRange.max,
        localControls.targetTemp + increment
      )
    )

    const newState = { ...localControls, targetTemp: newTemp }
    setLocalControls(newState)
    onUpdate?.({ thermostatControls: newState })
  }, [localControls, onUpdate, device.thermostatSpecs])

  const handleModeChange = useCallback((mode) => {
    const newState = { ...localControls, mode }
    setLocalControls(newState)
    onUpdate?.({ thermostatControls: newState })
  }, [localControls, onUpdate])

  const getModeColor = (mode) => {
    switch (mode) {
      case 'heat': return 'text-red-600 bg-red-50'
      case 'cool': return 'text-blue-600 bg-blue-50'
      case 'auto': return 'text-green-600 bg-green-50'
      default: return 'text-slate-600 bg-slate-50'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Thermostat Controls
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

      {localControls.isOn && (
        <>
          {/* Temperature Display & Controls */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <div className="text-xs text-slate-600">Current Temperature</div>
              <div className="text-2xl font-bold text-slate-900">
                {localControls.currentTemp}°F
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-slate-600">Target Temperature</div>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => handleTempChange('target', 'down')}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                  disabled={localControls.targetTemp <= device.thermostatSpecs.tempRange.min}
                >
                  <ChevronDown size={16} className="text-slate-600" />
                </button>

                <div className="text-xl font-bold text-blue-600 min-w-[60px]">
                  {localControls.targetTemp}°F
                </div>

                <button
                  onClick={() => handleTempChange('target', 'up')}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                  disabled={localControls.targetTemp >= device.thermostatSpecs.tempRange.max}
                >
                  <ChevronUp size={16} className="text-slate-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Mode Selection */}
          <div className="space-y-2">
            <div className="text-sm text-slate-600">Mode</div>
            <div className="grid grid-cols-4 gap-2">
              {device.thermostatSpecs.supportedModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleModeChange(mode)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg transition-colors capitalize ${
                    localControls.mode === mode
                      ? getModeColor(mode)
                      : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Fan Mode */}
          <div className="space-y-2">
            <div className="text-sm text-slate-600">Fan</div>
            <div className="flex space-x-2">
              {device.thermostatSpecs.supportedFanModes.map((fanMode) => (
                <button
                  key={fanMode}
                  onClick={() => setLocalControls(prev => ({ ...prev, fanMode }))}
                  className={`py-2 px-4 text-xs font-medium rounded-lg transition-colors capitalize ${
                    localControls.fanMode === fanMode
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  {fanMode}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Status */}
          {device.thermostatSpecs.hasScheduling && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Schedule</span>
              <span className={`font-medium ${
                localControls.schedule?.enabled ? 'text-green-600' : 'text-slate-400'
              }`}>
                {localControls.schedule?.enabled
                  ? `Active (${localControls.schedule.currentPeriod})`
                  : 'Disabled'
                }
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}