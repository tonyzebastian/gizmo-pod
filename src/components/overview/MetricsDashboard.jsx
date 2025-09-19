import React, { useState } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { SYSTEM_METRICS, getMetricDisplayInfo } from '../../data/mockMetrics'
import { cn } from '../../utils/cn'

const MetricCard = ({ metricKey, metric, isActive, onClick, isLoading, timePeriod, comparison }) => {
  const displayInfo = getMetricDisplayInfo(metricKey, timePeriod, comparison)

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp data-testid={`trend-${metricKey}`} size={18} className="text-green-600" />
      case 'down':
        return <TrendingDown data-testid={`trend-${metricKey}`} size={18} className="text-red-600" />
      default:
        return <Minus data-testid={`trend-${metricKey}`} size={18} className="text-gray-500" />
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

  const getBaselinePeriod = (comparison) => {
    const periods = {
      yesterday: 'vs yesterday',
      last7days: 'vs last 7d',
      lastmonth: 'vs last month',
      lastyear: 'vs same period last year'
    }
    return periods[comparison] || 'vs baseline'
  }

  if (isLoading) {
    return (
      <div className="p-6 rounded-lg border bg-white animate-pulse w-80 flex flex-col justify-center min-h-[120px]">
        <div className="mb-3">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="flex items-end">
          <div className="h-8 bg-gray-200 rounded w-32"></div>
          <div className="h-4 bg-gray-200 rounded w-12 ml-3"></div>
        </div>
      </div>
    )
  }

  return (
    <div
      data-testid={`metric-card-${metricKey}`}
      onClick={onClick}
      className={cn(
        "p-6 rounded-lg cursor-pointer transition-all duration-200 w-80 flex flex-col justify-center min-h-[120px]",
        isActive
          ? "bg-white border-2 border-blue-600"
          : "bg-white border border-gray-200 hover:border-primary-200"
      )}
    >
      {/* Header with label */}
      <div className="mb-3">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {displayInfo.title}
        </h3>
      </div>

      {/* Main value with delta */}
      <div className="flex items-end">
        <p className="text-3xl font-bold text-gray-900 leading-none">
          {displayInfo.value}
        </p>
        <span className={cn("text-sm font-semibold ml-3", getTrendColor(metric.trend))}>
          {displayInfo.change}
        </span>
      </div>
    </div>
  )
}

export const MetricsDashboard = ({ onMetricSelect, timePeriod, comparison }) => {
  const [activeMetric, setActiveMetric] = useState('powerUsage')
  const [isLoading, setIsLoading] = useState(false)

  const handleMetricClick = (metricKey) => {
    if (metricKey === activeMetric) return // Don't reload same metric

    setIsLoading(true)
    setActiveMetric(metricKey)

    // Simulate loading delay for better UX
    setTimeout(() => {
      setIsLoading(false)
      onMetricSelect?.(metricKey)
    }, 300)
  }

  return (
    <div className="flex gap-6">
      {Object.entries(SYSTEM_METRICS).map(([key, metric]) => (
        <MetricCard
          key={key}
          metricKey={key}
          metric={metric}
          isActive={activeMetric === key}
          isLoading={isLoading && activeMetric === key}
          timePeriod={timePeriod}
          comparison={comparison}
          onClick={() => handleMetricClick(key)}
        />
      ))}
    </div>
  )
}