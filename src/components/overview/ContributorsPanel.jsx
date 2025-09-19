import React, { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

// Mock data for contributors
const generateContributors = (metricType) => {
  const baseContributors = {
    powerUsage: [
      { name: 'Living Room Thermostat', type: 'device', value: 1.2, unit: 'kW', percentage: 24.5, delta: '+5.2%' },
      { name: 'Kitchen', type: 'room', value: 0.8, unit: 'kW', percentage: 16.3, delta: '-2.1%' },
      { name: 'Main Energy Monitor', type: 'device', value: 0.7, unit: 'kW', percentage: 14.2, delta: '+8.7%' },
      { name: 'Living Room', type: 'room', value: 0.6, unit: 'kW', percentage: 12.2, delta: '+1.4%' },
      { name: 'Washing Machine Plug', type: 'device', value: 0.5, unit: 'kW', percentage: 10.2, delta: '+15.3%' },
      { name: 'Bedroom', type: 'room', value: 0.4, unit: 'kW', percentage: 8.1, delta: '-3.2%' },
      { name: 'Robot Vacuum', type: 'device', value: 0.3, unit: 'kW', percentage: 6.1, delta: '+2.8%' },
      { name: 'Front Door Camera', type: 'device', value: 0.2, unit: 'kW', percentage: 4.1, delta: '+1.1%' },
      { name: 'Living Room Speaker', type: 'device', value: 0.15, unit: 'kW', percentage: 3.1, delta: '-0.5%' },
      { name: 'Entrance', type: 'room', value: 0.1, unit: 'kW', percentage: 2.0, delta: '+0.2%' }
    ],
    temperature: [
      { name: 'Living Room', type: 'room', value: 72, unit: '°F', percentage: 35.2, delta: '+1.2°F' },
      { name: 'Kitchen', type: 'room', value: 71, unit: '°F', percentage: 28.4, delta: '+0.8°F' },
      { name: 'Bedroom', type: 'room', value: 70, unit: '°F', percentage: 22.1, delta: '-0.5°F' },
      { name: 'Entrance', type: 'room', value: 69, unit: '°F', percentage: 14.3, delta: '+0.3°F' }
    ],
    airQuality: [
      { name: 'Kitchen', type: 'room', value: 18, unit: 'PPM', percentage: 42.3, delta: '-2.1 PPM' },
      { name: 'Living Room', type: 'room', value: 12, unit: 'PPM', percentage: 28.2, delta: '-1.8 PPM' },
      { name: 'Bedroom', type: 'room', value: 10, unit: 'PPM', percentage: 23.5, delta: '-0.9 PPM' },
      { name: 'Entrance', type: 'room', value: 5, unit: 'PPM', percentage: 6.0, delta: '-0.2 PPM' }
    ]
  }

  return baseContributors[metricType] || baseContributors.powerUsage
}

export const ContributorsPanel = ({ activeMetric }) => {
  const [sortField, setSortField] = useState('percentage')
  const [sortDirection, setSortDirection] = useState('desc')

  const contributors = generateContributors(activeMetric)

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const sortedContributors = [...contributors].sort((a, b) => {
    let aVal = a[sortField]
    let bVal = b[sortField]

    // Handle string sorting for names
    if (typeof aVal === 'string') {
      return sortDirection === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }

    // Handle numeric sorting
    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
  })

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
  }

  const getDeltaColor = (delta) => {
    if (delta.includes('+')) return 'text-green-600'
    if (delta.includes('-')) return 'text-red-600'
    return 'text-gray-500'
  }

  return (
    <div className="bg-white rounded-lg border h-fit">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Contributors</h3>
      </div>

      <div className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                onClick={() => handleSort('name')}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-1">
                  Device/Room
                  <SortIcon field="name" />
                </div>
              </th>
              <th
                onClick={() => handleSort('percentage')}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-1">
                  %
                  <SortIcon field="percentage" />
                </div>
              </th>
              <th
                onClick={() => handleSort('value')}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-1">
                  Value
                  <SortIcon field="value" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delta
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedContributors.slice(0, 10).map((contributor, index) => (
              <tr key={`${contributor.name}-${index}`} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      contributor.type === 'device' ? 'bg-blue-500' : 'bg-green-500'
                    }`} />
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {contributor.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {contributor.percentage.toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {contributor.value} {contributor.unit}
                </td>
                <td className={`px-4 py-3 text-sm font-medium ${getDeltaColor(contributor.delta)}`}>
                  {contributor.delta}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}