// Helper functions to generate historical data for device vitals
const generateConnectivityHistory = () => {
  const data = []
  for (let i = 23; i >= 0; i--) {
    const hour = new Date()
    hour.setHours(hour.getHours() - i)
    data.push({
      timestamp: hour.toISOString(),
      value: Math.floor(Math.random() * 20) + 80 // 80-100%
    })
  }
  return data
}

const generatePowerHistory = (baseValue, deviceType) => {
  const data = []
  const multiplier = deviceType === 'light' ? 0.8 : deviceType === 'speaker' ? 0.6 : 1

  for (let i = 23; i >= 0; i--) {
    const hour = new Date()
    hour.setHours(hour.getHours() - i)
    const variation = (Math.random() - 0.5) * baseValue * 0.2
    data.push({
      timestamp: hour.toISOString(),
      value: Math.max(0, baseValue + (variation * multiplier))
    })
  }
  return data
}

const generateBrightnessHistory = () => {
  const data = []
  for (let i = 23; i >= 0; i--) {
    const hour = new Date()
    hour.setHours(hour.getHours() - i)
    // Simulate day/night cycle
    const hourOfDay = hour.getHours()
    let baseValue = 20
    if (hourOfDay >= 6 && hourOfDay <= 22) {
      baseValue = 60 + (Math.sin((hourOfDay - 6) / 16 * Math.PI) * 20)
    }
    data.push({
      timestamp: hour.toISOString(),
      value: Math.max(0, Math.min(100, baseValue + (Math.random() - 0.5) * 20))
    })
  }
  return data
}

const generateVolumeHistory = () => {
  const data = []
  for (let i = 23; i >= 0; i--) {
    const hour = new Date()
    hour.setHours(hour.getHours() - i)
    const baseValue = 45 + (Math.random() * 40)
    data.push({
      timestamp: hour.toISOString(),
      value: Math.max(0, Math.min(100, baseValue))
    })
  }
  return data
}

const generateBatteryHistory = () => {
  const data = []
  let batteryLevel = 100
  for (let i = 23; i >= 0; i--) {
    const hour = new Date()
    hour.setHours(hour.getHours() - i)
    batteryLevel = Math.max(10, batteryLevel - (Math.random() * 3))
    data.push({
      timestamp: hour.toISOString(),
      value: Math.floor(batteryLevel)
    })
  }
  return data
}

export const DEVICES = [
  {
    id: 'gizmopod-hub',
    name: 'GizmoPod Hub',
    type: 'gizmopod',
    room: 'Living Room',
    // Relative coordinates (0-1) within floor plan
    x: 0.55,   // Center of living room
    y: 0.45,
    status: 'active',
    coreVital: {
      label: 'Internet',
      value: 'Strong',
      rawValue: 95
    },
    battery: null,
    powerData: {
      current: 3.5,
      daily: 84,
      monthly: 2520,
      trend: 'stable'
    },
    vitalsHistory: {
      connectivity: generateConnectivityHistory(),
      powerConsumption: generatePowerHistory(3.5, 'gizmopod')
    },
    lastActivity: '2025-09-18T10:30:00Z',
    connectionProtocol: 'ethernet'
  },

  {
    id: 'living-room-light',
    name: 'Living Room Light',
    type: 'light',
    room: 'Living Room',
    x: 0.35,   // Living room left side
    y: 0.35,
    status: 'active',
    coreVital: {
      label: 'Brightness',
      value: 'Warm White 80%',
      rawValue: 80
    },
    battery: null,
    powerData: {
      current: 12,
      daily: 288,
      monthly: 8640,
      trend: 'down'
    },
    vitalsHistory: {
      brightness: generateBrightnessHistory(),
      powerConsumption: generatePowerHistory(12, 'light')
    },
    lastActivity: '2025-09-18T10:25:00Z',
    connectionProtocol: 'zigbee'
  },

  {
    id: 'kitchen-speaker',
    name: 'Kitchen Speaker',
    type: 'speaker',
    room: 'Kitchen',
    x: 0.8,    // Kitchen area
    y: 0.5,
    status: 'active',
    coreVital: {
      label: 'Volume',
      value: '65%',
      rawValue: 65
    },
    battery: {
      level: 15,  // Low battery - will override core vital
      isCharging: false,
      lastCharged: '2025-09-17T22:00:00Z'
    },
    powerData: {
      current: 8,
      daily: 192,
      monthly: 5760,
      trend: 'stable'
    },
    vitalsHistory: {
      volume: generateVolumeHistory(),
      battery: generateBatteryHistory(),
      powerConsumption: generatePowerHistory(8, 'speaker')
    },
    lastActivity: '2025-09-18T10:28:00Z',
    connectionProtocol: 'wifi'
  },

  {
    id: 'bedroom-thermostat',
    name: 'Bedroom Thermostat',
    type: 'thermostat',
    room: 'Bedroom',
    x: 0.3,    // Bedroom area
    y: 0.75,
    status: 'active',
    coreVital: {
      label: 'Target Temp',
      value: '72°F',
      rawValue: 72
    },
    battery: null,
    powerData: {
      current: 2.1,
      daily: 50.4,
      monthly: 1512,
      trend: 'stable'
    },
    vitalsHistory: {
      temperature: generatePowerHistory(72, 'thermostat'),
      powerConsumption: generatePowerHistory(2.1, 'thermostat')
    },
    lastActivity: '2025-09-18T10:15:00Z',
    connectionProtocol: 'wifi'
  },

  {
    id: 'kitchen-camera',
    name: 'Kitchen Camera',
    type: 'camera',
    room: 'Kitchen',
    x: 0.85,   // Kitchen corner
    y: 0.25,
    status: 'active',
    coreVital: {
      label: 'Recording',
      value: '1080p',
      rawValue: 100
    },
    battery: null,
    powerData: {
      current: 5.2,
      daily: 124.8,
      monthly: 3744,
      trend: 'up'
    },
    vitalsHistory: {
      connectivity: generateConnectivityHistory(),
      powerConsumption: generatePowerHistory(5.2, 'camera')
    },
    lastActivity: '2025-09-18T10:32:00Z',
    connectionProtocol: 'wifi'
  },

  {
    id: 'living-room-purifier',
    name: 'Living Room Purifier',
    type: 'purifier',
    room: 'Living Room',
    x: 0.25,   // Living room corner
    y: 0.65,
    status: 'active',
    coreVital: {
      label: 'Air Quality',
      value: 'Good',
      rawValue: 85
    },
    battery: null,
    powerData: {
      current: 15.3,
      daily: 367.2,
      monthly: 11016,
      trend: 'stable'
    },
    vitalsHistory: {
      airQuality: generatePowerHistory(85, 'purifier'),
      powerConsumption: generatePowerHistory(15.3, 'purifier')
    },
    lastActivity: '2025-09-18T10:20:00Z',
    connectionProtocol: 'wifi'
  }
];

// Device type configurations - using Lucide icon names
export const DEVICE_ICONS = {
  gizmopod: 'Home',
  light: 'Lightbulb',
  speaker: 'Volume2',
  thermostat: 'Thermometer',
  camera: 'Camera',
  purifier: 'Wind'
}

export const DEVICE_COLORS = {
  gizmopod: '#ffffff',   // white
  light: '#ffffff',      // white
  speaker: '#ffffff',    // white
  thermostat: '#ffffff', // white
  camera: '#ffffff',     // white
  purifier: '#ffffff'    // white
}

// Icon colors for better visual distinction
export const DEVICE_ICON_COLORS = {
  gizmopod: '#3b82f6',   // blue
  light: '#f59e0b',      // amber
  speaker: '#06b6d4',    // cyan
  thermostat: '#f97316', // orange
  camera: '#ef4444',     // red
  purifier: '#8b5cf6'    // violet
}