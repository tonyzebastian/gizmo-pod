import React, { useState } from 'react'
import { AlertTriangle, AlertCircle, Info, Zap, Filter, X, ChevronDown } from 'lucide-react'

// Mock data for incidents
const generateIncidentsData = () => [
  {
    id: 'inc-001',
    severity: 'critical',
    deviceName: 'Front Door Camera',
    room: 'Entrance',
    description: 'Camera offline - network connectivity lost',
    timestamp: '2 minutes ago',
    type: 'connectivity'
  },
  {
    id: 'inc-002',
    severity: 'high',
    deviceName: 'Living Room Thermostat',
    room: 'Living Room',
    description: 'Temperature sensor reading anomaly detected',
    timestamp: '15 minutes ago',
    type: 'sensor'
  },
  {
    id: 'inc-003',
    severity: 'medium',
    deviceName: 'Robot Vacuum',
    room: 'Living Room',
    description: 'Low battery warning - 12% remaining',
    timestamp: '1 hour ago',
    type: 'battery'
  },
  {
    id: 'inc-004',
    severity: 'low',
    deviceName: 'Kitchen Speaker',
    room: 'Kitchen',
    description: 'Firmware update available',
    timestamp: '2 hours ago',
    type: 'update'
  },
  {
    id: 'inc-005',
    severity: 'high',
    deviceName: 'Main Energy Monitor',
    room: 'Utility',
    description: 'Power consumption spike detected (+45%)',
    timestamp: '3 hours ago',
    type: 'power'
  },
  {
    id: 'inc-006',
    severity: 'medium',
    deviceName: 'Bedroom Light',
    room: 'Bedroom',
    description: 'Delayed response to commands',
    timestamp: '4 hours ago',
    type: 'performance'
  },
  {
    id: 'inc-007',
    severity: 'critical',
    deviceName: 'Front Door Lock',
    room: 'Entrance',
    description: 'Failed to lock - mechanical issue suspected',
    timestamp: '5 hours ago',
    type: 'security'
  },
  {
    id: 'inc-008',
    severity: 'low',
    deviceName: 'Backyard Camera',
    room: 'Backyard',
    description: 'Storage usage above 80%',
    timestamp: '6 hours ago',
    type: 'storage'
  }
]

export const IncidentsPanel = () => {
  const [deviceFilter, setDeviceFilter] = useState('all')
  const [roomFilter, setRoomFilter] = useState('all')
  const [severityFilter, setSeverityFilter] = useState('all')

  const incidents = generateIncidentsData()

  // Get unique values for filters
  const devices = [...new Set(incidents.map(inc => inc.deviceName))]
  const rooms = [...new Set(incidents.map(inc => inc.room))]
  const severities = ['critical', 'high', 'medium', 'low']

  // Filter incidents
  const filteredIncidents = incidents.filter(incident => {
    return (
      (deviceFilter === 'all' || incident.deviceName === deviceFilter) &&
      (roomFilter === 'all' || incident.room === roomFilter) &&
      (severityFilter === 'all' || incident.severity === severityFilter)
    )
  })

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle size={14} className="text-red-600" />
      case 'high':
        return <AlertCircle size={14} className="text-orange-600" />
      case 'medium':
        return <Info size={14} className="text-yellow-600" />
      case 'low':
        return <Zap size={14} className="text-blue-600" />
      default:
        return <Info size={14} className="text-gray-600" />
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const clearFilters = () => {
    setDeviceFilter('all')
    setRoomFilter('all')
    setSeverityFilter('all')
  }

  const hasActiveFilters = deviceFilter !== 'all' || roomFilter !== 'all' || severityFilter !== 'all'

  return (
    <div className="bg-white rounded-lg border h-fit">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Incidents</h3>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="text-xs border rounded px-2 py-1 pr-6 focus:outline-none focus:ring-1 focus:ring-primary-500 appearance-none bg-white"
              >
                <option value="all">All Severities</option>
                {severities.map(severity => (
                  <option key={severity} value={severity}>
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={roomFilter}
                onChange={(e) => setRoomFilter(e.target.value)}
                className="text-xs border rounded px-2 py-1 pr-6 focus:outline-none focus:ring-1 focus:ring-primary-500 appearance-none bg-white"
              >
                <option value="all">All Rooms</option>
                {rooms.map(room => (
                  <option key={room} value={room}>{room}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 px-2 py-1 border rounded hover:bg-gray-50"
              >
                <X size={12} />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Device
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredIncidents.slice(0, 6).map((incident) => (
              <tr key={incident.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                    {incident.severity}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {incident.deviceName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {incident.room}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-900 truncate block max-w-48">
                    {incident.description}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {incident.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredIncidents.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <AlertCircle size={24} className="mx-auto mb-2 text-gray-400" />
          <p className="text-sm">No incidents found matching current filters</p>
        </div>
      )}
    </div>
  )
}