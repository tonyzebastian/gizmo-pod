import React, { useMemo } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Calendar, HardDrive, Shield, AlertTriangle } from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export const CameraCharts = ({ device }) => {
  if (!device?.surveillance || !device?.cameraControls) return null

  // Memoize storage usage chart
  const storageData = useMemo(() => {
    const usedPercentage = (device.surveillance.storageUsed / device.surveillance.storageTotal) * 100
    return {
      datasets: [
        {
          data: [usedPercentage, 100 - usedPercentage],
          backgroundColor: ['#3b82f6', '#e5e7eb'],
          borderWidth: 0,
          cutout: '70%'
        }
      ]
    }
  }, [device.surveillance.storageUsed, device.surveillance.storageTotal])

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  }), [])

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const getEventIcon = (type) => {
    switch (type) {
      case 'person': return '👤'
      case 'vehicle': return '🚗'
      case 'package': return '📦'
      default: return '🔍'
    }
  }

  return (
    <div className="space-y-6">
      {/* Surveillance & Analytics */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">
          Surveillance & Analytics
        </h3>

        {/* Storage & Stats Circles */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {/* Storage Used */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2">
              <Doughnut data={storageData} options={chartOptions} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">
                  {Math.round((device.surveillance.storageUsed / device.surveillance.storageTotal) * 100)}%
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Storage Used
            </span>
          </div>

          {/* Motion Events Today */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-green-600">
                  {device.surveillance.motionEvents.length}
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Motion Events
            </span>
          </div>

          {/* Active Zones */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-purple-600">
                  {device.surveillance.motionZones.filter(zone => zone.active).length}
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Active Zones
            </span>
          </div>

          {/* Recordings */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-orange-600">
                  {device.surveillance.recordings.length}
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Recordings
            </span>
          </div>
        </div>

        {/* Recent Motion Events */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <AlertTriangle size={14} className="text-orange-500" />
            <h4 className="text-sm font-medium text-slate-900">Recent Motion Events</h4>
          </div>
          <div className="space-y-2">
            {device.surveillance.motionEvents.slice(0, 3).map((event, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm">{getEventIcon(event.type)}</span>
                  <div>
                    <div className="text-sm font-medium text-slate-900 capitalize">{event.type}</div>
                    <div className="text-xs text-slate-500">{formatTimestamp(event.timestamp)}</div>
                  </div>
                </div>
                <div className="text-xs font-medium text-green-600">
                  {event.confidence}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motion Zones */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Shield size={14} className="text-blue-500" />
            <h4 className="text-sm font-medium text-slate-900">Motion Zones</h4>
          </div>
          <div className="space-y-2">
            {device.surveillance.motionZones.map((zone) => (
              <div key={zone.id} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${zone.active ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">{zone.name}</div>
                    <div className="text-xs text-slate-500 capitalize">{zone.sensitivity} sensitivity</div>
                  </div>
                </div>
                <div className={`text-xs font-medium ${zone.active ? 'text-green-600' : 'text-slate-400'}`}>
                  {zone.active ? 'Active' : 'Inactive'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Storage & System Stats */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Storage Used</span>
            <span className="font-medium text-slate-900">
              {device.surveillance.storageUsed}GB / {device.surveillance.storageTotal}GB
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Recording Quality</span>
            <span className="font-medium text-slate-900">
              {device.cameraControls.quality}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Motion Detection</span>
            <span className={`font-medium ${
              device.cameraControls.motionDetection ? 'text-green-600' : 'text-slate-400'
            }`}>
              {device.cameraControls.motionDetection ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Night Vision</span>
            <span className={`font-medium ${
              device.cameraControls.nightVision ? 'text-purple-600' : 'text-slate-400'
            }`}>
              {device.cameraControls.nightVision ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}