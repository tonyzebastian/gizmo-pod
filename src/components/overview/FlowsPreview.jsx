import React from 'react'
import { GitBranch, Play, Pause, Settings } from 'lucide-react'

const FlowCard = ({ flow, isActive }) => {
  return (
    <div className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <GitBranch size={16} className="text-gray-500" />
          <h4 className="font-medium text-gray-900">{flow.name}</h4>
        </div>
        <div className="flex items-center gap-2">
          {isActive ? (
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          ) : (
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          )}
          <button className="text-gray-400 hover:text-gray-600">
            <Settings size={16} />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3">{flow.description}</p>

      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          isActive
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>

        <button className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700">
          {isActive ? <Pause size={14} /> : <Play size={14} />}
          {isActive ? 'Pause' : 'Run'}
        </button>
      </div>
    </div>
  )
}

export const FlowsPreview = () => {
  const mockFlows = [
    {
      id: 1,
      name: 'Morning Routine',
      description: 'Automatically adjust lights and temperature when first motion is detected',
      isActive: true
    },
    {
      id: 2,
      name: 'Energy Saver',
      description: 'Turn off unused devices when power consumption is high',
      isActive: true
    },
    {
      id: 3,
      name: 'Security Mode',
      description: 'Enable all cameras and sensors when away mode is activated',
      isActive: false
    }
  ]

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Automation Flows</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockFlows.map((flow) => (
          <FlowCard
            key={flow.id}
            flow={flow}
            isActive={flow.isActive}
          />
        ))}
      </div>
    </div>
  )
}