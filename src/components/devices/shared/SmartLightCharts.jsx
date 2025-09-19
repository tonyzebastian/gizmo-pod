import React, { useRef, useEffect, useMemo } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'
import { TrendingDown, Star } from 'lucide-react'

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

export const SmartLightCharts = ({ device }) => {
  if (!device?.lifetime || !device?.energyAnalytics) return null

  // Memoize lifetime chart data
  const lifetimeData = useMemo(() => ({
    datasets: [
      {
        data: [device.lifetime.remainingPercent, 100 - device.lifetime.remainingPercent],
        backgroundColor: ['#10b981', '#e5e7eb'],
        borderWidth: 0,
        cutout: '75%'
      }
    ]
  }), [device.lifetime.remainingPercent])

  const lifetimeOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  }), [])

  // Memoize energy chart data
  const energyChartData = useMemo(() => {
    const usageData = device.energyAnalytics.dailyUsageHours.slice(-7) // Last 7 days
    return {
      labels: usageData.map(item => {
        const date = new Date(item.timestamp)
        return date.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 3)
      }),
      datasets: [
        {
          label: 'Daily Usage (Hours)',
          data: usageData.map(item => item.value / 10), // Convert to hours approximation
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4
        }
      ]
    }
  }, [device.energyAnalytics.dailyUsageHours])

  const energyChartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3b82f6',
        borderWidth: 1,
        callbacks: {
          label: (context) => `${context.parsed.y.toFixed(1)} hours`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280', font: { size: 11 } }
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        ticks: {
          color: '#6b7280',
          font: { size: 11 },
          callback: (value) => `${value}h`
        }
      }
    }
  }), [])

  return (
    <div className="space-y-6">
      {/* Usage Overview */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">
          Usage Overview
        </h3>

        {/* Circular Progress Indicators */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {/* Current Cost */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-green-600">
                  ${(device.energyAnalytics.costPerMonth * device.powerData.current / (device.powerData.monthly / 30 / 24)).toFixed(2)}
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Current Cost
            </span>
          </div>

          {/* Estimated Monthly Cost */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-green-600">
                  ${device.energyAnalytics.costPerMonth}
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Est. Monthly Cost
            </span>
          </div>

          {/* Used Hours */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-slate-900">
                  {(device.lifetime.totalHours / 1000).toFixed(1)}k
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Used Hours
            </span>
          </div>

          {/* Lifetime Remaining */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2">
              <Doughnut data={lifetimeData} options={lifetimeOptions} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-slate-900">
                  {device.lifetime.remainingPercent}%
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Lifetime Remaining
            </span>
          </div>
        </div>
      </div>

      {/* Power Usage */}
      <div className="space-y-4 pt-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">
          Power Usage
        </h3>

        {/* Power Stats in inline layout */}
        <div className="flex justify-between gap-4 mb-4">
          <div className="flex-1 text-center">
            <div className="text-xs text-slate-600 mb-1">Current Usage</div>
            <div className="text-sm font-bold text-slate-900">{device.powerData.current}W</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-xs text-slate-600 mb-1">Daily Usage</div>
            <div className="text-sm font-bold text-slate-900">{(device.powerData.daily / 1000).toFixed(1)}kWh</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-xs text-slate-600 mb-1">Monthly Usage</div>
            <div className="text-sm font-bold text-slate-900">{(device.powerData.monthly / 1000).toFixed(1)}kWh</div>
          </div>
        </div>

        {/* Power Usage Chart */}
        <div className="h-32">
          <Line data={energyChartData} options={energyChartOptions} />
        </div>
      </div>


    </div>
  )
}