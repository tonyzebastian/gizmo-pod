import React, { useState } from 'react'
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

export const MetricChart = ({ activeMetric, metricData }) => {
  const [timePeriod, setTimePeriod] = useState('7d')

  if (!activeMetric || !metricData) {
    return (
      <div data-testid="metric-chart-container" className="bg-white rounded-lg border p-6">
        <p className="text-gray-500 text-center">Select a metric to view chart</p>
      </div>
    )
  }

  const displayInfo = getMetricDisplayInfo(activeMetric)
  const chartData = getChartData(activeMetric, timePeriod)

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
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{displayInfo.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-900">{displayInfo.value}</span>
            <span className={cn(
              "text-sm font-medium",
              displayInfo.trend === 'up' ? 'text-green-600' :
              displayInfo.trend === 'down' ? 'text-red-600' : 'text-gray-500'
            )}>
              {displayInfo.change}
            </span>
          </div>
        </div>

        <TimePeriodSelector
          activePeriod={timePeriod}
          onPeriodChange={setTimePeriod}
        />
      </div>

      {/* Chart */}
      <div className="h-64">
        <Line
          data={chartData}
          options={chartOptions}
        />
      </div>
    </div>
  )
}