import React, { useState } from 'react'
import { MetricsDashboard } from './MetricsDashboard'
import { MetricChart } from './MetricChart'
import { FlowsPreview } from './FlowsPreview'
import { SYSTEM_METRICS } from '../../data/mockMetrics'

export const OverviewSection = () => {
  const [activeMetric, setActiveMetric] = useState('powerUsage')

  const handleMetricSelect = (metricKey) => {
    setActiveMetric(metricKey)
  }

  return (
    <div className="space-y-6">
      {/* Metrics Dashboard */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">System Overview</h2>
        <MetricsDashboard onMetricSelect={handleMetricSelect} />
      </div>

      {/* Metric Visualization */}
      <MetricChart
        activeMetric={activeMetric}
        metricData={SYSTEM_METRICS}
      />

      {/* Automation Flows Preview */}
      <FlowsPreview />
    </div>
  )
}