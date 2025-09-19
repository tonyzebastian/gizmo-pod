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
        return date.toLocaleDateString('en-US', { weekday: 'short' })
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
      {/* Usage Pattern & Analytics */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">
          Usage Pattern & Analytics
        </h3>

        {/* Circular Progress Indicators */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {/* Current Usage */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-slate-900">
                  {device.powerData.current}W
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Current Usage
            </span>
          </div>

          {/* Daily Usage */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-slate-900">
                  {(device.powerData.daily / 1000).toFixed(1)}
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Daily Usage
            </span>
          </div>

          {/* Monthly Usage */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-slate-900">
                  {(device.powerData.monthly / 1000).toFixed(1)}
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Monthly Usage
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

        {/* Usage Pattern Chart */}
        <div className="h-32 mb-6">
          <Line data={energyChartData} options={energyChartOptions} />
        </div>

        {/* Device Stats */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Used Hours</span>
            <span className="font-medium text-slate-900">
              {device.lifetime.totalHours.toLocaleString()}h
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Rated Hours</span>
            <span className="font-medium text-slate-900">
              {device.lifetime.ratedHours.toLocaleString()}h
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Efficiency</span>
            <div className="flex items-center">
              <Star size={12} className="text-yellow-500 mr-1" />
              <span className="font-medium text-slate-900">
                {device.energyAnalytics.efficiencyRating}
              </span>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Monthly Cost</span>
            <span className="font-medium text-green-600">
              ${device.energyAnalytics.costPerMonth}
            </span>
          </div>
        </div>
      </div>


    </div>
  )
}