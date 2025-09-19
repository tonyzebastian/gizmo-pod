import React, { useState } from 'react'
import { X, Wifi, Battery, Zap, Activity, Home, ChefHat, Bed } from 'lucide-react'
import { DEVICE_ICONS } from '../../../data/mockDevices'
import { SmartLightControls } from './SmartLightControls'
import { SmartLightCharts } from './SmartLightCharts'
import { ThermostatControls } from './ThermostatControls'
import { ThermostatCharts } from './ThermostatCharts'
import { CameraControls } from './CameraControls'
import { CameraCharts } from './CameraCharts'
import { EnergyControls } from './EnergyControls'
import { EnergyCharts } from './EnergyCharts'

export const DeviceSidebar = ({ device, onClose }) => {
  const [localDevice, setLocalDevice] = useState(device)

  if (!device) return null

  const handleDeviceUpdate = (updates) => {
    setLocalDevice(prev => ({ ...prev, ...updates }))
    // Here you could also call an API to update the device on the server
    console.log('Device updated:', updates)
  }

  // Helper function to format last activity
  const formatLastActivity = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  // Helper function to get status color
  const getStatusColor = (status) => {
    return status === 'active' ? 'text-green-600' : 'text-slate-400'
  }

  // Helper function to get connection protocol icon
  const getConnectionIcon = (protocol) => {
    switch (protocol) {
      case 'wifi':
        return <Wifi size={12} className="text-blue-500" />
      case 'zigbee':
        return <Activity size={12} className="text-purple-500" />
      case 'ethernet':
        return <Zap size={12} className="text-green-500" />
      default:
        return <Wifi size={12} className="text-slate-400" />
    }
  }

  // Helper function to get room icon
  const getRoomIcon = (room) => {
    const roomLower = room.toLowerCase()
    if (roomLower.includes('living')) return <Home size={12} className="text-slate-500" />
    if (roomLower.includes('kitchen')) return <ChefHat size={12} className="text-slate-500" />
    if (roomLower.includes('bedroom')) return <Bed size={12} className="text-slate-500" />
    return <Home size={12} className="text-slate-500" />
  }

  // Helper function to get device-specific vital representation
  const getVitalDisplay = (device) => {
    switch (device.type) {
      case 'doorlock':
        return {
          icon: device.coreVital.value === 'Locked' ? '🔒' : '🔓',
          value: device.coreVital.value,
          color: device.coreVital.value === 'Locked' ? 'text-green-600' : 'text-red-600'
        }
      case 'light':
        return {
          icon: device.status === 'active' ? '💡' : '⚫',
          value: device.status === 'active' ? 'On' : 'Off',
          color: device.status === 'active' ? 'text-yellow-600' : 'text-slate-400'
        }
      case 'speaker':
        return {
          icon: device.status === 'active' ? '🔊' : '🔇',
          value: device.coreVital.value,
          color: device.status === 'active' ? 'text-blue-600' : 'text-slate-400'
        }
      case 'thermostat':
        return {
          icon: '🌡️',
          value: device.coreVital.value,
          color: 'text-orange-600'
        }
      case 'energymonitor':
        return {
          icon: '⚡',
          value: device.coreVital.value,
          color: 'text-yellow-600'
        }
      case 'vacuum':
        return {
          icon: device.status === 'active' ? '🤖' : '⏸️',
          value: device.coreVital.value,
          color: device.status === 'active' ? 'text-purple-600' : 'text-slate-400'
        }
      case 'camera':
      case 'camera_front':
        return {
          icon: device.status === 'active' ? '📹' : '📷',
          value: device.coreVital.value,
          color: device.status === 'active' ? 'text-red-600' : 'text-slate-400'
        }
      case 'smartplug':
        return {
          icon: device.status === 'active' ? '🔌' : '⚫',
          value: device.status === 'active' ? 'On' : 'Off',
          color: device.status === 'active' ? 'text-green-600' : 'text-slate-400'
        }
      default:
        return {
          icon: '📱',
          value: device.coreVital.value,
          color: 'text-slate-600'
        }
    }
  }

  const vitalDisplay = getVitalDisplay(localDevice)
  const iconPath = DEVICE_ICONS[localDevice.type] || DEVICE_ICONS.gizmopod

  return (
    <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-2/5 md:w-1/3 lg:w-2/5 bg-white border-l border-slate-200 shadow-xl z-30 overflow-y-auto transform transition-transform duration-300 ease-in-out">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-slate-200 p-6 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src={iconPath}
                alt={device.type}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <div className="mb-1">
                <h2 className="text-xl font-bold text-slate-900">{device.name}</h2>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${device.status === 'active' ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                  <span className="capitalize">{device.status}</span>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center space-x-1">
                  {getRoomIcon(device.room)}
                  <span>{device.room}</span>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center space-x-1">
                  {getConnectionIcon(device.connectionProtocol)}
                  <span className="capitalize">{device.connectionProtocol}</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="capitalize text-slate-500">
                  {device.type.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Device-Specific Controls - First Section */}
        {localDevice.type === 'light' && localDevice.lightControls && (
          <SmartLightControls
            device={localDevice}
            onUpdate={handleDeviceUpdate}
          />
        )}

        {localDevice.type === 'thermostat' && localDevice.thermostatControls && (
          <ThermostatControls
            device={localDevice}
            onUpdate={handleDeviceUpdate}
          />
        )}

        {(localDevice.type === 'camera' || localDevice.type === 'camera_front') && localDevice.cameraControls && (
          <CameraControls
            device={localDevice}
            onUpdate={handleDeviceUpdate}
          />
        )}

        {localDevice.type === 'energymonitor' && localDevice.energyControls && (
          <EnergyControls
            device={localDevice}
            onUpdate={handleDeviceUpdate}
          />
        )}

        {/* Battery Info (if applicable) */}
        {device.battery && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Battery</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Level</span>
                <div className="flex items-center space-x-2">
                  <Battery
                    size={16}
                    className={device.battery.level < 20 ? 'text-red-500' : 'text-green-500'}
                  />
                  <span className={`text-sm font-medium ${
                    device.battery.level < 20 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {device.battery.level}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Charging</span>
                <span className="text-sm font-medium text-slate-900">
                  {device.battery.isCharging ? 'Yes' : 'No'}
                </span>
              </div>
              {device.battery.lastCharged && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Last Charged</span>
                  <span className="text-sm font-medium text-slate-900">
                    {formatLastActivity(device.battery.lastCharged)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}



        {/* Device-Specific Analytics & Charts */}
        {localDevice.type === 'light' && localDevice.lifetime && (
          <SmartLightCharts device={localDevice} />
        )}

        {localDevice.type === 'thermostat' && localDevice.hvacAnalytics && (
          <ThermostatCharts device={localDevice} />
        )}

        {(localDevice.type === 'camera' || localDevice.type === 'camera_front') && localDevice.surveillance && (
          <CameraCharts device={localDevice} />
        )}

        {localDevice.type === 'energymonitor' && localDevice.energyAnalytics && (
          <EnergyCharts device={localDevice} />
        )}

        {/* General Device Controls */}
        {!['light', 'thermostat', 'camera', 'camera_front', 'energymonitor'].includes(localDevice.type) && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Controls</h3>
            <div className="space-y-2">
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Toggle Device
              </button>
              <button className="w-full py-2 px-4 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium">
                View Settings
              </button>
              <button className="w-full py-2 px-4 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium">
                View History
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}