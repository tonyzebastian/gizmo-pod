import React, { useMemo } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

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

export const ThermostatCharts = ({ device }) => {
  if (!device?.hvacAnalytics || !device?.thermostatControls) return null

  // Memoize HVAC runtime chart data
  const runtimeData = useMemo(() => {
    const runtime = device.hvacAnalytics.runtime
    const total = runtime.heating + runtime.cooling + runtime.idle
    return {
      datasets: [
        {
          data: [
            (runtime.heating / total) * 100,
            (runtime.cooling / total) * 100,
            (runtime.idle / total) * 100
          ],
          backgroundColor: ['#ef4444', '#3b82f6', '#e5e7eb'],
          borderWidth: 0,
          cutout: '70%'
        }
      ]
    }
  }, [device.hvacAnalytics.runtime])

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  }), [])

  // Memoize temperature history chart
  const tempChartData = useMemo(() => {
    const history = device.hvacAnalytics.temperatureHistory?.slice(-7) || []
    return {
      labels: history.map(item => {
        const date = new Date(item.timestamp)
        return date.toLocaleDateString('en-US', { weekday: 'short' })
      }),
      datasets: [
        {
          label: 'Temperature (°F)',
          data: history.map(item => item.value),
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4
        }
      ]
    }
  }, [device.hvacAnalytics.temperatureHistory])

  const tempChartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#10b981',
        borderWidth: 1,
        callbacks: {
          label: (context) => `${context.parsed.y}°F`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280', font: { size: 11 } }
      },
      y: {
        beginAtZero: false,
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        ticks: {
          color: '#6b7280',
          font: { size: 11 },
          callback: (value) => `${value}°F`
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

        {/* Runtime Metrics */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {/* Heating Hours */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-red-600">
                  {device.hvacAnalytics.runtime.heating}h
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Heating
            </span>
          </div>

          {/* Cooling Hours */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">
                  {device.hvacAnalytics.runtime.cooling}h
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Cooling
            </span>
          </div>

          {/* Idle Hours */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-slate-900">
                  {device.hvacAnalytics.runtime.idle}h
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Idle
            </span>
          </div>

          {/* Efficiency */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2">
              <Doughnut data={runtimeData} options={chartOptions} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-green-600">
                  {device.hvacAnalytics.runtime.efficiency}
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Efficiency
            </span>
          </div>
        </div>

        {/* Temperature History Chart */}
        <div className="h-32 mb-6">
          <Line data={tempChartData} options={tempChartOptions} />
        </div>

        {/* Energy Usage Stats */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Daily Energy</span>
            <span className="font-medium text-slate-900">
              {device.hvacAnalytics.energyUsage.daily} kWh
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Weekly Energy</span>
            <span className="font-medium text-slate-900">
              {device.hvacAnalytics.energyUsage.weekly} kWh
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Monthly Energy</span>
            <span className="font-medium text-slate-900">
              {device.hvacAnalytics.energyUsage.monthly} kWh
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Weekly Trend</span>
            <span className={`font-medium capitalize ${
              device.hvacAnalytics.weeklyTrend === 'increasing' ? 'text-red-600' :
              device.hvacAnalytics.weeklyTrend === 'decreasing' ? 'text-green-600' : 'text-slate-600'
            }`}>
              {device.hvacAnalytics.weeklyTrend}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}