import React, { useMemo } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'
import { TrendingUp, Zap, Home, AlertTriangle } from 'lucide-react'

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

export const EnergyCharts = ({ device }) => {
  if (!device?.energyAnalytics || !device?.applianceBreakdown) return null

  // Memoize appliance breakdown pie chart
  const applianceData = useMemo(() => {
    const breakdown = device.applianceBreakdown
    return {
      labels: Object.keys(breakdown),
      datasets: [
        {
          data: Object.values(breakdown).map(item => item.percentage),
          backgroundColor: [
            '#ef4444', // HVAC - red
            '#3b82f6', // Water heater - blue
            '#10b981', // Lighting - green
            '#f59e0b', // Appliances - yellow
            '#8b5cf6'  // Other - purple
          ],
          borderWidth: 0
        }
      ]
    }
  }, [device.applianceBreakdown])

  // Memoize usage history line chart
  const usageChartData = useMemo(() => {
    const history = device.energyAnalytics.usageHistory?.slice(-7) || []
    return {
      labels: history.map(item => {
        const date = new Date(item.timestamp)
        return date.toLocaleDateString('en-US', { weekday: 'short' })
      }),
      datasets: [
        {
          label: 'Energy Usage (kWh)',
          data: history.map(item => item.value / 1000), // Convert to kWh
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
  }, [device.energyAnalytics.usageHistory])

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  }), [])

  const lineChartOptions = useMemo(() => ({
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
          label: (context) => `${context.parsed.y.toFixed(1)} kWh`
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
          callback: (value) => `${value}kWh`
        }
      }
    }
  }), [])

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="space-y-6">
      {/* Usage Pattern & Analytics */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">
          Usage Pattern & Analytics
        </h3>

        {/* Real-time & Cost Circles */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {/* Real-time Usage */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">
                  {(device.energyAnalytics.realTimeUsage / 1000).toFixed(1)}kW
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Real-time
            </span>
          </div>

          {/* Daily Cost */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-green-600">
                  ${device.energyAnalytics.dailyCost}
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Daily Cost
            </span>
          </div>

          {/* Monthly Cost */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-orange-600">
                  ${Math.round(device.energyAnalytics.monthlyCost)}
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Monthly Cost
            </span>
          </div>

          {/* Appliance Breakdown */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2">
              <Doughnut data={applianceData} options={chartOptions} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Home size={16} className="text-slate-600" />
              </div>
            </div>
            <span className="text-xs text-slate-600 text-center">
              Breakdown
            </span>
          </div>
        </div>

        {/* Usage Pattern Chart */}
        <div className="h-32 mb-6">
          <Line data={usageChartData} options={lineChartOptions} />
        </div>

        {/* Appliance Breakdown Details */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Zap size={14} className="text-yellow-500" />
            <h4 className="text-sm font-medium text-slate-900">Appliance Breakdown</h4>
          </div>
          <div className="space-y-2">
            {Object.entries(device.applianceBreakdown).map(([appliance, data]) => (
              <div key={appliance} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: appliance === 'hvac' ? '#ef4444' :
                                     appliance === 'waterHeater' ? '#3b82f6' :
                                     appliance === 'lighting' ? '#10b981' :
                                     appliance === 'appliances' ? '#f59e0b' : '#8b5cf6'
                    }}
                  ></div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 capitalize">
                      {appliance.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-xs text-slate-500">{data.current}W</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-900">{data.percentage}%</div>
                  <div className="text-xs text-slate-500">{data.daily} kWh/day</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Anomalies */}
        {device.energyAnalytics.anomalies && device.energyAnalytics.anomalies.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle size={14} className="text-red-500" />
              <h4 className="text-sm font-medium text-slate-900">Recent Anomalies</h4>
            </div>
            <div className="space-y-2">
              {device.energyAnalytics.anomalies.slice(0, 2).map((anomaly, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-red-900">{anomaly.usage}W spike</div>
                    <div className="text-xs text-red-600">{formatTimestamp(anomaly.timestamp)}</div>
                  </div>
                  <div className="text-xs font-medium text-red-700 capitalize">
                    {anomaly.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Energy Stats */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Peak Usage Today</span>
            <span className="font-medium text-slate-900">
              {device.energyAnalytics.peakUsage}W
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Average Usage</span>
            <span className="font-medium text-slate-900">
              {device.energyAnalytics.averageUsage}W
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Cost per kWh</span>
            <span className="font-medium text-slate-900">
              ${device.energyAnalytics.costPerKwh}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Weekly Trend</span>
            <span className={`font-medium capitalize ${
              device.energyAnalytics.weeklyTrend === 'increasing' ? 'text-red-600' :
              device.energyAnalytics.weeklyTrend === 'decreasing' ? 'text-green-600' : 'text-slate-600'
            }`}>
              {device.energyAnalytics.weeklyTrend}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}