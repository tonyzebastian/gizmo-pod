import React from 'react'
import { CheckCircle, AlertTriangle, XCircle, Battery } from 'lucide-react'
import { DEVICES } from '../../data/mockDevices'

// Transform device data for health panel
const generateDeviceHealthData = () => {
  // Define device-specific statuses
  const deviceStatuses = {
    'gizmopod-hub': 'online',
    'living-room-light': 'online',
    'kitchen-speaker': 'playing',
    'bedroom-light': 'online',
    'front-door-camera': 'online',
    'thermostat-lr': 'idle',
    'robot-vacuum': 'cleaning',
    'air-purifier': 'online',
    'backyard-camera': 'offline',
    'door-lock': 'online'
  }

  return DEVICES.map(device => {
    const deviceStatus = deviceStatuses[device.id] || 'online'

    // Determine health category based on device status
    let healthStatus = 'ok'
    if (deviceStatus === 'offline') {
      healthStatus = 'error'
    } else if (device.battery && device.battery.level < 20) {
      healthStatus = 'warning'
    }

    return {
      id: device.id,
      deviceName: device.name,
      room: device.room,
      status: deviceStatus,
      healthStatus,
      battery: device.battery?.level || null,
      connectionProtocol: device.connectionProtocol
    }
  }).sort((a, b) => {
    // Sort by health priority: error, warning, ok
    const statusPriority = { error: 0, warning: 1, ok: 2 }
    return statusPriority[a.healthStatus] - statusPriority[b.healthStatus]
  })
}

export const DeviceHealthPanel = () => {
  const devices = generateDeviceHealthData()

  const handleDeviceClick = (deviceId) => {
    console.log(`Navigate to device: ${deviceId}`)
    // TODO: Implement navigation to device detail page
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800'
      case 'offline':
        return 'bg-red-100 text-red-800'
      case 'idle':
        return 'bg-yellow-100 text-yellow-800'
      case 'cleaning':
        return 'bg-blue-100 text-blue-800'
      case 'playing':
        return 'bg-purple-100 text-purple-800'
      case 'listening':
        return 'bg-indigo-100 text-indigo-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getBatteryColor = (level) => {
    if (level >= 50) return 'text-green-600'
    if (level >= 20) return 'text-yellow-600'
    return 'text-red-600'
  }

  // Count devices by health status for summary
  const statusCounts = devices.reduce((acc, device) => {
    acc[device.healthStatus] = (acc[device.healthStatus] || 0) + 1
    return acc
  }, {})

  return (
    <div className="bg-white rounded-lg border h-fit">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Device Health</h3>

          {/* Status Summary */}
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">{statusCounts.ok || 0} OK</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">{statusCounts.warning || 0} Warning</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">{statusCounts.error || 0} Error</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-h-[405px] overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Device
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {devices.map((device) => (
              <tr
                key={device.id}
                onClick={() => handleDeviceClick(device.id)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {device.deviceName}
                    </span>
                    {device.battery !== null && (
                      <div className="flex items-center">
                        <Battery size={12} className={getBatteryColor(device.battery)} />
                        <span className={`ml-1 text-xs ${getBatteryColor(device.battery)}`}>
                          {device.battery}%
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-900">
                    {device.room}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                    {device.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}