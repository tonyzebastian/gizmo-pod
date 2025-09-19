import React, { useState, useCallback } from 'react'
import { Bell, BellOff, Activity, AlertTriangle } from 'lucide-react'

export const EnergyControls = ({ device, onUpdate }) => {
  const [localControls, setLocalControls] = useState(device?.energyControls || {})

  // Validate required props and data
  if (!device?.energyControls || !device?.energyAnalytics) {
    return null
  }

  const handleToggleMonitoring = useCallback(() => {
    const newState = { ...localControls, realTimeMonitoring: !localControls.realTimeMonitoring }
    setLocalControls(newState)
    onUpdate?.({ energyControls: newState })
  }, [localControls, onUpdate])

  const handleToggleAlerts = useCallback(() => {
    const newState = { ...localControls, alertsEnabled: !localControls.alertsEnabled }
    setLocalControls(newState)
    onUpdate?.({ energyControls: newState })
  }, [localControls, onUpdate])

  const handleThresholdChange = useCallback((type, value) => {
    const newState = {
      ...localControls,
      thresholds: {
        ...localControls.thresholds,
        [type]: parseInt(value)
      }
    }
    setLocalControls(newState)
    onUpdate?.({ energyControls: newState })
  }, [localControls, onUpdate])

  const getCurrentUsageStatus = () => {
    const usage = device.energyAnalytics.realTimeUsage
    if (usage >= localControls.thresholds.critical) {
      return { status: 'critical', color: 'text-red-600 bg-red-50', icon: AlertTriangle }
    } else if (usage >= localControls.thresholds.high) {
      return { status: 'high', color: 'text-orange-600 bg-orange-50', icon: AlertTriangle }
    }
    return { status: 'normal', color: 'text-green-600 bg-green-50', icon: Activity }
  }

  const usageStatus = getCurrentUsageStatus()
  const StatusIcon = usageStatus.icon

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Energy Monitor Controls
        </h3>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${usageStatus.color}`}>
          <StatusIcon size={12} />
          <span className="capitalize">{usageStatus.status}</span>
        </div>
      </div>

      {/* Real-time Usage Display */}
      <div className="text-center space-y-2 py-4 bg-slate-50 rounded-lg">
        <div className="text-xs text-slate-600">Real-time Usage</div>
        <div className="text-2xl font-bold text-slate-900">
          {device.energyAnalytics.realTimeUsage}W
        </div>
        <div className="text-xs text-slate-600">
          ${device.energyAnalytics.currentCost.toFixed(3)}/hour
        </div>
      </div>

      {/* Monitoring Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Real-time Monitoring</span>
          <button
            onClick={handleToggleMonitoring}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              localControls.realTimeMonitoring ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                localControls.realTimeMonitoring ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Usage Alerts</span>
          <button
            onClick={handleToggleAlerts}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              localControls.alertsEnabled
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {localControls.alertsEnabled ? (
              <Bell size={14} />
            ) : (
              <BellOff size={14} />
            )}
            <span className="text-xs font-medium">
              {localControls.alertsEnabled ? 'On' : 'Off'}
            </span>
          </button>
        </div>
      </div>

      {/* Alert Thresholds */}
      {localControls.alertsEnabled && (
        <div className="space-y-3">
          <div className="text-sm text-slate-600">Alert Thresholds</div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">High Usage</span>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="1000"
                  max="5000"
                  step="100"
                  value={localControls.thresholds.high}
                  onChange={(e) => handleThresholdChange('high', e.target.value)}
                  className="w-20 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-900 min-w-[50px]">
                  {localControls.thresholds.high}W
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Critical Usage</span>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="2000"
                  max="8000"
                  step="100"
                  value={localControls.thresholds.critical}
                  onChange={(e) => handleThresholdChange('critical', e.target.value)}
                  className="w-20 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-900 min-w-[50px]">
                  {localControls.thresholds.critical}W
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Usage Summary */}
      <div className="space-y-2 pt-2 border-t border-slate-200">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Peak Usage Today</span>
          <span className="font-medium text-slate-900">
            {device.energyAnalytics.peakUsage}W
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Average Usage</span>
          <span className="font-medium text-slate-900">
            {device.energyAnalytics.averageUsage}W
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Daily Cost</span>
          <span className="font-medium text-green-600">
            ${device.energyAnalytics.dailyCost}
          </span>
        </div>
      </div>
    </div>
  )
}