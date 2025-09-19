import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { ChevronDown } from 'lucide-react'
import { getChartData, getMetricDisplayInfo } from '../../data/mockMetrics'
import { cn } from '../../utils/cn'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const TimePeriodSelector = ({ activePeriod, onPeriodChange }) => {
  const periods = [
    { key: '7d', label: '7D' },
    { key: '30d', label: '30D' },
    { key: '90d', label: '90D' }
  ]

  return (
    <div data-testid="time-period-selector" className="flex bg-gray-100 rounded-lg p-1">
      {periods.map((period) => (
        <button
          key={period.key}
          onClick={() => onPeriodChange(period.key)}
          className={cn(
            "px-3 py-1 text-sm font-medium rounded-md transition-colors",
            activePeriod === period.key
              ? "bg-primary-500 text-white"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          {period.label}
        </button>
      ))}
    </div>
  )
}

const GroupBySelector = ({ activeGroupBy, onGroupByChange, activeMetric }) => {
  // Define group options based on the active metric
  const getGroupOptions = (metricType) => {
    const baseOptions = [{ key: 'none', label: 'None' }]

    if (metricType === 'powerUsage') {
      return [
        ...baseOptions,
        { key: 'room', label: 'Room' },
        { key: 'deviceType', label: 'Device Type' },
        { key: 'device', label: 'Device' }
      ]
    } else if (metricType === 'temperature' || metricType === 'airQuality') {
      return [
        ...baseOptions,
        { key: 'room', label: 'Room' }
      ]
    }

    return baseOptions
  }

  const groupOptions = getGroupOptions(activeMetric)

  return (
    <div className="relative">
      <select
        value={activeGroupBy}
        onChange={(e) => onGroupByChange(e.target.value)}
        className="px-3 py-2 pr-8 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
      >
        {groupOptions.map((option) => (
          <option key={option.key} value={option.key}>
            Group by {option.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  )
}

export const MetricChart = ({
  activeMetric,
  metricData,
  timeRange,
  groupBy,
  onTimeRangeChange,
  onGroupByChange
}) => {
  // Reset groupBy if current selection is not available for the new metric
  useEffect(() => {
    if (activeMetric) {
      const validOptions = ['none', 'room']
      if (activeMetric === 'powerUsage') {
        validOptions.push('deviceType', 'device')
      }

      if (!validOptions.includes(groupBy)) {
        onGroupByChange('none')
      }
    }
  }, [activeMetric, groupBy, onGroupByChange])

  if (!activeMetric || !metricData) {
    return (
      <div data-testid="metric-chart-container" className="bg-white rounded-lg border p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-900 mb-2">Trends</p>
          <p className="text-gray-500">Select a metric tile above to view detailed trends</p>
        </div>
      </div>
    )
  }

  const displayInfo = getMetricDisplayInfo(activeMetric)
  const chartData = getChartData(activeMetric, timeRange, groupBy)

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        },
        ticks: {
          color: '#6B7280',
          maxTicksLimit: 6
        }
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)'
        },
        ticks: {
          color: '#6B7280'
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  }

  return (
    <div data-testid="metric-chart-container" className="bg-white rounded-lg border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Trends</h3>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <TimePeriodSelector
            activePeriod={timeRange}
            onPeriodChange={onTimeRangeChange}
          />
          <GroupBySelector
            activeGroupBy={groupBy}
            onGroupByChange={onGroupByChange}
            activeMetric={activeMetric}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <Line
          data={chartData}
          options={chartOptions}
        />
      </div>
    </div>
  )
}