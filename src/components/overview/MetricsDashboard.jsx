import React, { useState } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { SYSTEM_METRICS, getMetricDisplayInfo } from '../../data/mockMetrics'
import { cn } from '../../utils/cn'

const MetricCard = ({ metricKey, metric, isActive, onClick }) => {
  const displayInfo = getMetricDisplayInfo(metricKey)

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp data-testid={`trend-${metricKey}`} size={16} className="text-green-600" />
      case 'down':
        return <TrendingDown data-testid={`trend-${metricKey}`} size={16} className="text-red-600" />
      default:
        return <Minus data-testid={`trend-${metricKey}`} size={16} className="text-gray-500" />
    }
  }

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div
      data-testid={`metric-card-${metricKey}`}
      onClick={onClick}
      className={cn(
        "p-6 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md",
        isActive
          ? "bg-white shadow-lg ring-2 ring-primary-500"
          : "bg-gray-50 border-gray-200 hover:bg-white"
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{displayInfo.title}</h3>
        {getTrendIcon(metric.trend)}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {displayInfo.value}
          </p>
          <p className={cn("text-sm font-medium", getTrendColor(metric.trend))}>
            {displayInfo.change}
          </p>
        </div>
      </div>
    </div>
  )
}

export const MetricsDashboard = ({ onMetricSelect }) => {
  const [activeMetric, setActiveMetric] = useState('powerUsage')

  const handleMetricClick = (metricKey) => {
    setActiveMetric(metricKey)
    onMetricSelect?.(metricKey)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(SYSTEM_METRICS).map(([key, metric]) => (
        <MetricCard
          key={key}
          metricKey={key}
          metric={metric}
          isActive={activeMetric === key}
          onClick={() => handleMetricClick(key)}
        />
      ))}
    </div>
  )
}