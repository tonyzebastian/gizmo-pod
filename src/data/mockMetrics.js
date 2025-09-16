// Helper functions to generate historical data
const generatePowerHistory = (days = 30) => {
  const data = []
  const baseValue = 1200
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)

    // Generate realistic power usage with daily patterns
    const dailyVariation = Math.sin(i * 0.1) * 100
    const randomVariation = (Math.random() - 0.5) * 150
    const value = Math.round(baseValue + dailyVariation + randomVariation)

    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(800, Math.min(1600, value))
    })
  }

  return data
}

const generateTemperatureHistory = (days = 30) => {
  const data = []
  const baseTemp = 72
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)

    // Generate realistic temperature with seasonal variation
    const seasonalVariation = Math.sin(i * 0.05) * 3
    const dailyVariation = Math.sin(i * 0.2) * 2
    const randomVariation = (Math.random() - 0.5) * 2
    const value = Math.round(baseTemp + seasonalVariation + dailyVariation + randomVariation)

    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(65, Math.min(80, value))
    })
  }

  return data
}

const generateAirQualityHistory = (days = 30) => {
  const data = []
  const baseAQ = 15
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)

    // Generate realistic air quality (lower is better)
    const trendVariation = Math.sin(i * 0.08) * 5
    const randomVariation = (Math.random() - 0.5) * 8
    const value = Math.round(baseAQ + trendVariation + randomVariation)

    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(5, Math.min(35, value))
    })
  }

  return data
}

// System metrics with historical data
export const SYSTEM_METRICS = {
  powerUsage: {
    current: 1247,
    trend: 'up',
    change: '+12%',
    unit: 'W',
    label: 'Power Usage',
    history: generatePowerHistory(30),
    history7d: generatePowerHistory(7),
    history90d: generatePowerHistory(90)
  },
  temperature: {
    current: 72,
    trend: 'stable',
    change: '0°F',
    unit: '°F',
    label: 'Temperature',
    history: generateTemperatureHistory(30),
    history7d: generateTemperatureHistory(7),
    history90d: generateTemperatureHistory(90)
  },
  airQuality: {
    current: 15,
    trend: 'down',
    change: '-3 PPM',
    unit: 'PPM',
    label: 'Air Quality',
    status: 'good',
    history: generateAirQualityHistory(30),
    history7d: generateAirQualityHistory(7),
    history90d: generateAirQualityHistory(90)
  }
}

// Helper function to get metric display info
export const getMetricDisplayInfo = (metricKey) => {
  const metric = SYSTEM_METRICS[metricKey]
  if (!metric) return null

  return {
    title: metric.label,
    value: `${metric.current.toLocaleString()} ${metric.unit}`,
    change: metric.change,
    trend: metric.trend,
    status: metric.status || 'normal'
  }
}

// Helper function to get chart data for a metric and time period
export const getChartData = (metricKey, timePeriod = '30d') => {
  const metric = SYSTEM_METRICS[metricKey]
  if (!metric) return null

  let historyKey = 'history'
  if (timePeriod === '7d') historyKey = 'history7d'
  if (timePeriod === '90d') historyKey = 'history90d'

  const history = metric[historyKey] || metric.history

  return {
    labels: history.map(point => point.date),
    datasets: [{
      label: metric.label,
      data: history.map(point => point.value),
      borderColor: getMetricColor(metricKey),
      backgroundColor: getMetricColor(metricKey, 0.1),
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4
    }]
  }
}

// Helper function to get metric-specific colors
export const getMetricColor = (metricKey, alpha = 1) => {
  const colors = {
    powerUsage: `rgba(59, 130, 246, ${alpha})`, // Blue
    temperature: `rgba(245, 158, 11, ${alpha})`, // Orange
    airQuality: `rgba(16, 185, 129, ${alpha})` // Green
  }

  return colors[metricKey] || `rgba(107, 114, 128, ${alpha})`
}