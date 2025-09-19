import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PageHeader } from '../layout/PageHeader'
import { MetricsDashboard } from './MetricsDashboard'
import { MetricChart } from './MetricChart'
import { IncidentsPanel } from './IncidentsPanel'
import { DeviceHealthPanel } from './DeviceHealthPanel'
import { SYSTEM_METRICS } from '../../data/mockMetrics'

export const OverviewSection = () => {
  const [activeMetric, setActiveMetric] = useState('powerUsage')
  const [timeRange, setTimeRange] = useState('7d')
  const [groupBy, setGroupBy] = useState('none')
  const [timePeriod, setTimePeriod] = useState('today')
  const [comparison, setComparison] = useState('yesterday')

  const handleMetricSelect = (metricKey) => {
    setActiveMetric(metricKey)
  }

  return (
    <div className="h-full overflow-auto bg-white">
      {/* Header */}
      <PageHeader title="Overview">
        {/* Top-level Filters */}
        <div className="flex items-center gap-4">
          {/* Time Period Filter */}
          <div className="relative">
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="px-3 py-1.5 pr-8 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="now">Right Now</option>
              <option value="today">Today</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Comparison Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">vs</label>
            <div className="relative">
              <select
                value={comparison}
                onChange={(e) => setComparison(e.target.value)}
                className="px-3 py-1.5 pr-8 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 Days</option>
                <option value="lastmonth">Last Month</option>
                <option value="lastyear">Same Period Last Year</option>
              </select>
              <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </PageHeader>

      {/* Content with padding */}
      <div className="pt-24 px-8 pb-8 space-y-8">
        {/* KPI Tiles */}
        <MetricsDashboard
          onMetricSelect={handleMetricSelect}
          timePeriod={timePeriod}
          comparison={comparison}
        />

      {/* Trends Section */}
      <div>
        <MetricChart
          activeMetric={activeMetric}
          metricData={SYSTEM_METRICS}
          timeRange={timeRange}
          groupBy={groupBy}
          onTimeRangeChange={setTimeRange}
          onGroupByChange={setGroupBy}
          comparison={comparison}
        />
      </div>

      {/* Bottom Row: Incidents & Device Health */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-8">
        {/* Incidents Panel */}
        <div>
          <IncidentsPanel />
        </div>

        {/* Device Health Panel */}
        <div>
          <DeviceHealthPanel />
        </div>
      </div>
      </div>
    </div>
  )
}