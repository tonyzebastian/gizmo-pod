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

// Helper function to get metric display info with dynamic calculations
export const getMetricDisplayInfo = (metricKey, timePeriod = 'today', comparison = 'yesterday') => {
  const metric = SYSTEM_METRICS[metricKey]
  if (!metric) return null

  // Calculate dynamic values based on filters
  const dynamicValues = calculateDynamicMetrics(metricKey, timePeriod, comparison)

  return {
    title: metric.label,
    value: `${dynamicValues.current.toLocaleString()} ${metric.unit}`,
    change: dynamicValues.change,
    trend: dynamicValues.trend,
    status: metric.status || 'normal'
  }
}

// Helper function to calculate dynamic metrics based on time period and comparison
const calculateDynamicMetrics = (metricKey, timePeriod, comparison) => {
  const baseMetric = SYSTEM_METRICS[metricKey]
  const baseCurrent = baseMetric.current

  // Calculate current value based on time period with realistic scaling
  let current = baseCurrent

  if (metricKey === 'powerUsage') {
    // Power usage scales dramatically with time period
    switch (timePeriod) {
      case 'now':
        current = 1.2 + Math.random() * 0.8 // 1-2 kW current usage
        break
      case 'today':
        current = 25 + Math.random() * 15 // 25-40 kWh today
        break
      case 'last7days':
        current = 250 + Math.random() * 100 // 250-350 kWh over 7 days
        break
      case 'last30days':
        current = 950 + Math.random() * 200 // 950-1150 kWh over 30 days
        break
    }
  } else {
    // Temperature and air quality remain similar regardless of time period (averages)
    switch (timePeriod) {
      case 'now':
        current = baseCurrent + (Math.random() - 0.5) * baseCurrent * 0.05
        break
      case 'today':
        current = baseCurrent + (Math.random() - 0.5) * baseCurrent * 0.03
        break
      case 'last7days':
        current = baseCurrent * 0.98 + (Math.random() - 0.5) * baseCurrent * 0.08
        break
      case 'last30days':
        current = baseCurrent * 0.96 + (Math.random() - 0.5) * baseCurrent * 0.12
        break
    }
  }

  // Calculate comparison value and delta - use current value as baseline for comparison
  let comparisonValue = current // Use the current period value as baseline

  // Apply comparison percentage differences
  switch (comparison) {
    case 'yesterday':
      comparisonValue = current * (0.95 + Math.random() * 0.1) // 95-105% of current
      break
    case 'last7days':
      comparisonValue = current * (0.90 + Math.random() * 0.2) // 90-110% of current
      break
    case 'lastmonth':
      comparisonValue = current * (0.85 + Math.random() * 0.3) // 85-115% of current
      break
    case 'lastyear':
      comparisonValue = current * (0.80 + Math.random() * 0.4) // 80-120% of current
      break
  }

  // Calculate percentage change
  const percentChange = ((current - comparisonValue) / comparisonValue) * 100
  const trend = percentChange > 2 ? 'up' : percentChange < -2 ? 'down' : 'stable'

  // Format change string based on metric type
  let changeStr
  if (metricKey === 'powerUsage') {
    changeStr = `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%`
  } else if (metricKey === 'temperature') {
    const tempChange = current - comparisonValue
    changeStr = `${tempChange > 0 ? '+' : ''}${tempChange.toFixed(1)}°F`
  } else if (metricKey === 'airQuality') {
    const aqiChange = current - comparisonValue
    changeStr = `${aqiChange > 0 ? '+' : ''}${aqiChange.toFixed(1)} PPM`
  }

  return {
    current: Math.round(current * 100) / 100,
    change: changeStr,
    trend: trend
  }
}

// Helper function to get chart data for a metric and time period
export const getChartData = (metricKey, timePeriod = '30d', groupBy = 'none', comparison = 'yesterday') => {
  const metric = SYSTEM_METRICS[metricKey]
  if (!metric) return null

  let historyKey = 'history'
  if (timePeriod === '7d') historyKey = 'history7d'
  if (timePeriod === '90d') historyKey = 'history90d'

  const history = metric[historyKey] || metric.history

  // Generate comparison data for delta calculation
  const comparisonData = generateComparisonData(history, comparison)

  // Calculate delta percentages
  const deltaData = history.map((point, index) => {
    const compPoint = comparisonData[index]
    if (!compPoint || compPoint.value === 0) return 0
    return ((point.value - compPoint.value) / compPoint.value) * 100
  })

  // If no grouping, return main dataset with delta
  if (groupBy === 'none') {
    const datasets = [
      {
        label: metric.label,
        data: history.map(point => point.value),
        borderColor: getMetricColor(metricKey),
        backgroundColor: getMetricColor(metricKey, 0.1),
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        yAxisID: 'y'
      },
      {
        label: `Delta (${getComparisonLabel(comparison)})`,
        data: deltaData,
        borderColor: getMetricColor(metricKey, 0.6),
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        yAxisID: 'y1'
      }
    ]

    return {
      labels: history.map(point => point.date),
      datasets
    }
  }

  // Generate grouped data based on groupBy type
  const groupedData = generateGroupedData(metricKey, history, groupBy)

  return {
    labels: history.map(point => point.date),
    datasets: groupedData.map((group, index) => ({
      label: group.name,
      data: group.data,
      borderColor: getGroupColor(index),
      backgroundColor: getGroupColor(index, 0.1),
      borderWidth: 2,
      fill: false,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
      yAxisID: 'y'
    }))
  }
}

// Helper function to generate comparison data for delta calculation
const generateComparisonData = (baseHistory, comparison) => {
  return baseHistory.map(point => {
    let comparisonMultiplier = 1

    switch (comparison) {
      case 'yesterday':
        comparisonMultiplier = 0.95 + Math.random() * 0.1 // 95-105% of current
        break
      case 'last7days':
        comparisonMultiplier = 0.90 + Math.random() * 0.2 // 90-110% of current
        break
      case 'lastmonth':
        comparisonMultiplier = 0.85 + Math.random() * 0.3 // 85-115% of current
        break
      case 'lastyear':
        comparisonMultiplier = 0.80 + Math.random() * 0.4 // 80-120% of current
        break
    }

    return {
      date: point.date,
      value: point.value * comparisonMultiplier
    }
  })
}

// Helper function to get comparison label
const getComparisonLabel = (comparison) => {
  const labels = {
    yesterday: 'vs Yesterday',
    last7days: 'vs Last 7 Days',
    lastmonth: 'vs Last Month',
    lastyear: 'vs Same Period Last Year'
  }
  return labels[comparison] || 'vs Baseline'
}

// Helper function to generate grouped data
const generateGroupedData = (metricKey, baseHistory, groupBy) => {
  const groups = getGroupOptions(groupBy)

  return groups.map(group => ({
    name: group.name,
    data: baseHistory.map(point => {
      // Generate variations based on group type
      const baseValue = point.value
      const variation = group.variation || 1
      const noise = (Math.random() - 0.5) * baseValue * 0.1
      return Math.round(baseValue * variation + noise)
    })
  }))
}

// Helper function to get group options
const getGroupOptions = (groupBy) => {
  switch (groupBy) {
    case 'room':
      return [
        { name: 'Living Room', variation: 1.2 },
        { name: 'Kitchen', variation: 0.8 },
        { name: 'Bedroom', variation: 0.6 },
        { name: 'Entrance', variation: 0.4 }
      ]
    case 'deviceType':
      return [
        { name: 'Lights', variation: 0.3 },
        { name: 'HVAC', variation: 1.5 },
        { name: 'Appliances', variation: 0.9 },
        { name: 'Security', variation: 0.2 }
      ]
    case 'device':
      return [
        { name: 'Thermostat', variation: 1.4 },
        { name: 'Energy Monitor', variation: 1.0 },
        { name: 'Smart Plug', variation: 0.7 },
        { name: 'Vacuum', variation: 0.3 }
      ]
    default:
      return []
  }
}

// Helper function to get colors for grouped datasets
const getGroupColor = (index, alpha = 1) => {
  const colors = [
    `rgba(59, 130, 246, ${alpha})`,   // Blue
    `rgba(245, 158, 11, ${alpha})`,   // Orange
    `rgba(16, 185, 129, ${alpha})`,   // Green
    `rgba(239, 68, 68, ${alpha})`,    // Red
    `rgba(139, 92, 246, ${alpha})`,   // Purple
    `rgba(236, 72, 153, ${alpha})`,   // Pink
    `rgba(14, 165, 233, ${alpha})`,   // Light Blue
    `rgba(34, 197, 94, ${alpha})`     // Light Green
  ]

  return colors[index % colors.length]
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