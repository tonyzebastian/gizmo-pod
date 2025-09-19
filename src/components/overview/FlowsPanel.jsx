import React from 'react'
import { GitBranch, ExternalLink } from 'lucide-react'

// Mock data for flows
const generateFlowsData = () => [
  {
    id: 'morning-routine',
    name: 'Morning Routine',
    runCount: 847,
    lastRun: '2 hours ago',
    status: 'enabled'
  },
  {
    id: 'energy-saver',
    name: 'Energy Saver',
    runCount: 1205,
    lastRun: '15 minutes ago',
    status: 'enabled'
  },
  {
    id: 'security-mode',
    name: 'Security Mode',
    runCount: 234,
    lastRun: '1 day ago',
    status: 'disabled'
  },
  {
    id: 'bedtime-routine',
    name: 'Bedtime Routine',
    runCount: 402,
    lastRun: '8 hours ago',
    status: 'enabled'
  },
  {
    id: 'motion-lights',
    name: 'Motion Activated Lights',
    runCount: 2847,
    lastRun: '5 minutes ago',
    status: 'enabled'
  },
  {
    id: 'temp-control',
    name: 'Temperature Control',
    runCount: 156,
    lastRun: '1 hour ago',
    status: 'enabled'
  },
  {
    id: 'vacation-mode',
    name: 'Vacation Mode',
    runCount: 0,
    lastRun: 'Never',
    status: 'disabled'
  },
  {
    id: 'air-quality',
    name: 'Air Quality Alert',
    runCount: 78,
    lastRun: '3 days ago',
    status: 'enabled'
  },
  {
    id: 'door-alerts',
    name: 'Door Security Alerts',
    runCount: 523,
    lastRun: '6 hours ago',
    status: 'disabled'
  },
  {
    id: 'device-health',
    name: 'Device Health Monitor',
    runCount: 1842,
    lastRun: '30 minutes ago',
    status: 'enabled'
  }
]

export const FlowsPanel = () => {
  const flows = generateFlowsData()

  const handleFlowClick = (flowId) => {
    console.log(`Navigate to flow: ${flowId}`)
    // TODO: Implement navigation to flow detail page
  }

  const getStatusBadgeColor = (status) => {
    return status === 'enabled'
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-white rounded-lg border h-fit">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Flows & Automations</h3>
        <p className="text-sm text-gray-500">Most active automation flows</p>
      </div>

      <div className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Flow Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Runs
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Run
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {flows.slice(0, 8).map((flow) => (
              <tr
                key={flow.id}
                onClick={() => handleFlowClick(flow.id)}
                className="hover:bg-gray-50 cursor-pointer group"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <GitBranch size={14} className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {flow.name}
                      </span>
                    </div>
                    <ExternalLink
                      size={12}
                      className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {flow.runCount.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {flow.lastRun}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(flow.status)}`}>
                    {flow.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t bg-gray-50">
        <button
          onClick={() => console.log('Navigate to all flows')}
          className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium text-center"
        >
          View All Flows
        </button>
      </div>
    </div>
  )
}