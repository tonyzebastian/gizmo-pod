// Import device icons
import gizmopodIcon from '../assets/devices/energy.png'
import doorlockIcon from '../assets/devices/lock.png'
import lightIcon from '../assets/devices/light.png'
import speakerIcon from '../assets/devices/speaker.png'
import thermostatIcon from '../assets/devices/thermostat.png'
import energymonitorIcon from '../assets/devices/energy.png'
import vacuumIcon from '../assets/devices/vaccum.png'
import cameraIcon from '../assets/devices/camera.png'
import camera2Icon from '../assets/devices/camera_2.png'
import smartplugIcon from '../assets/devices/plug.png'

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

const generateTemperatureHistory = () => {
  const data = []
  for (let i = 23; i >= 0; i--) {
    const hour = new Date()
    hour.setHours(hour.getHours() - i)
    const baseTemp = 70 + (Math.sin((hour.getHours() / 24) * Math.PI * 2) * 3)
    data.push({
      timestamp: hour.toISOString(),
      value: Math.round(baseTemp + (Math.random() - 0.5) * 4)
    })
  }
  return data
}

const generateEnergyHistory = () => {
  const data = []
  for (let i = 23; i >= 0; i--) {
    const hour = new Date()
    hour.setHours(hour.getHours() - i)
    // Higher consumption during day hours
    const hourOfDay = hour.getHours()
    let baseValue = 800
    if (hourOfDay >= 6 && hourOfDay <= 22) {
      baseValue = 1200 + (Math.sin((hourOfDay - 6) / 16 * Math.PI) * 400)
    }
    data.push({
      timestamp: hour.toISOString(),
      value: Math.max(200, baseValue + (Math.random() - 0.5) * 300)
    })
  }
  return data
}

// Enhanced Smart Light data generators
const generateLifetimeHistory = () => {
  const data = []
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    // Gradually decreasing lifespan
    const usage = 8000 - (i * 10) + (Math.random() * 100)
    data.push({
      timestamp: date.toISOString(),
      value: Math.max(0, usage)
    })
  }
  return data
}

const generateColorHistory = () => {
  const colors = [
    { name: 'Warm White', temp: 2700, rgb: '#FFE4B5' },
    { name: 'Cool White', temp: 5000, rgb: '#F5F5DC' },
    { name: 'Daylight', temp: 6500, rgb: '#E6E6FA' },
    { name: 'Red', temp: null, rgb: '#FF6B6B' },
    { name: 'Blue', temp: null, rgb: '#4ECDC4' },
    { name: 'Green', temp: null, rgb: '#45B7D1' }
  ]

  const data = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    data.push({
      timestamp: date.toISOString(),
      color: randomColor,
      duration: Math.floor(Math.random() * 8) + 2 // 2-10 hours
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
    x: 0.525,   // Center of living room
    y: 0.12,
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
    lastActivity: '2025-09-19T10:30:00Z',
    connectionProtocol: 'ethernet'
  },

  // Door Lock
  {
    id: 'front-door-lock',
    name: 'Front Door Lock',
    type: 'doorlock',
    room: 'Entrance',
    x: 0.72,
    y: 0.23,
    status: 'active',
    coreVital: {
      label: 'Lock Status',
      value: 'Locked',
      rawValue: 1
    },
    battery: {
      level: 85,
      isCharging: false,
      lastCharged: '2025-09-15T08:00:00Z'
    },
    powerData: {
      current: 0.5,
      daily: 12,
      monthly: 360,
      trend: 'stable'
    },
    vitalsHistory: {
      connectivity: generateConnectivityHistory(),
      powerConsumption: generatePowerHistory(0.5, 'doorlock')
    },
    lastActivity: '2025-09-19T08:30:00Z',
    connectionProtocol: 'zigbee'
  },

  // Smart Lights
  {
    id: 'living-room-light',
    name: 'Living Room Light',
    type: 'light',
    room: 'Living Room',
    x: 0.30,
    y: 0.23,
    status: 'active',
    coreVital: {
      label: 'Status',
      value: 'On',
      rawValue: 1
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
    lastActivity: '2025-09-19T10:25:00Z',
    connectionProtocol: 'zigbee',
    // Enhanced Smart Light attributes
    lightControls: {
      isOn: true,
      brightness: 80, // 0-100
      colorMode: 'temperature', // 'temperature' or 'rgb'
      colorTemperature: 2700, // Kelvin (2000-6500)
      rgbColor: '#FFE4B5',
      colorName: 'Warm White'
    },
    lightSpecs: {
      maxBrightness: 1600, // lumens
      colorTempRange: { min: 2000, max: 6500 },
      supportsRGB: true,
      dimmable: true
    },
    lifetime: {
      totalHours: 7850, // Current usage hours
      ratedHours: 25000, // Expected total lifetime
      remainingPercent: 69, // (25000 - 7850) / 25000 * 100
      history: generateLifetimeHistory()
    },
    energyAnalytics: {
      dailyUsageHours: generateBrightnessHistory(),
      weeklyTrend: 'decreasing',
      costPerMonth: 2.15,
      efficiencyRating: 'A++'
    },
    colorHistory: generateColorHistory()
  },

  {
    id: 'bedroom-light',
    name: 'Bedroom 1 Light',
    type: 'light',
    room: 'Bedroom',
    x: 0.30,
    y: 0.56,
    status: 'inactive',
    coreVital: {
      label: 'Status',
      value: 'Off',
      rawValue: 0
    },
    battery: null,
    powerData: {
      current: 0,
      daily: 120,
      monthly: 3600,
      trend: 'stable'
    },
    vitalsHistory: {
      brightness: generateBrightnessHistory(),
      powerConsumption: generatePowerHistory(8, 'light')
    },
    lastActivity: '2025-09-19T06:30:00Z',
    connectionProtocol: 'zigbee',
    // Enhanced Smart Light attributes
    lightControls: {
      isOn: false,
      brightness: 0, // 0-100
      colorMode: 'temperature', // 'temperature' or 'rgb'
      colorTemperature: 3000, // Kelvin (2000-6500)
      rgbColor: '#FFF8DC',
      colorName: 'Soft White'
    },
    lightSpecs: {
      maxBrightness: 1200, // lumens
      colorTempRange: { min: 2000, max: 6500 },
      supportsRGB: true,
      dimmable: true
    },
    lifetime: {
      totalHours: 4200, // Current usage hours
      ratedHours: 25000, // Expected total lifetime
      remainingPercent: 83, // (25000 - 4200) / 25000 * 100
      history: generateLifetimeHistory()
    },
    energyAnalytics: {
      dailyUsageHours: generateBrightnessHistory(),
      weeklyTrend: 'stable',
      efficiencyRating: 'A+',
      costPerMonth: '1.85'
    },
    colorHistory: generateColorHistory()
  },

  {
    id: 'bedroom-light-2',
    name: 'Bedroom 2 Light',
    type: 'light',
    room: 'Bedroom',
    x: 0.72,
    y: 0.48,
    status: 'inactive',
    coreVital: {
      label: 'Status',
      value: 'Off',
      rawValue: 0
    },
    battery: null,
    powerData: {
      current: 0,
      daily: 120,
      monthly: 3600,
      trend: 'stable'
    },
    vitalsHistory: {
      brightness: generateBrightnessHistory(),
      powerConsumption: generatePowerHistory(8, 'light')
    },
    lastActivity: '2025-09-19T06:30:00Z',
    connectionProtocol: 'zigbee',
    // Enhanced Smart Light attributes
    lightControls: {
      isOn: false,
      brightness: 0, // 0-100
      colorMode: 'temperature', // 'temperature' or 'rgb'
      colorTemperature: 4000, // Kelvin (2000-6500)
      rgbColor: '#F5F5DC',
      colorName: 'Cool White'
    },
    lightSpecs: {
      maxBrightness: 1400, // lumens
      colorTempRange: { min: 2000, max: 6500 },
      supportsRGB: true,
      dimmable: true
    },
    lifetime: {
      totalHours: 3100, // Current usage hours
      ratedHours: 25000, // Expected total lifetime
      remainingPercent: 88, // (25000 - 3100) / 25000 * 100
      history: generateLifetimeHistory()
    },
    energyAnalytics: {
      dailyUsageHours: generateBrightnessHistory(),
      weeklyTrend: 'stable',
      efficiencyRating: 'A',
      costPerMonth: '1.75'
    },
    colorHistory: generateColorHistory()
  },

  // Smart Speaker
  {
    id: 'kitchen-speaker',
    name: 'Living Room Speaker',
    type: 'speaker',
    room: 'Kitchen',
    x: 0.40,
    y: 0.13,
    status: 'active',
    coreVital: {
      label: 'Status',
      value: 'Playing Music',
      rawValue: 1
    },
    battery: null,
    powerData: {
      current: 8,
      daily: 192,
      monthly: 5760,
      trend: 'stable'
    },
    vitalsHistory: {
      volume: generateVolumeHistory(),
      powerConsumption: generatePowerHistory(8, 'speaker')
    },
    lastActivity: '2025-09-19T10:28:00Z',
    connectionProtocol: 'wifi'
  },

  // Thermostat
  {
    id: 'living-room-thermostat',
    name: 'Dining Room Thermostat',
    type: 'thermostat',
    room: 'Living Room',
    x: 0.43,
    y: 0.58,
    status: 'active',
    coreVital: {
      label: 'Temperature',
      value: '72°F → 74°F',
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
      temperature: generateTemperatureHistory(),
      powerConsumption: generatePowerHistory(2.1, 'thermostat')
    },
    // Thermostat-specific properties
    thermostatControls: {
      currentTemp: 72,
      targetTemp: 74,
      mode: 'heat', // 'heat', 'cool', 'auto', 'off'
      fanMode: 'auto', // 'auto', 'on'
      isOn: true,
      schedule: {
        enabled: true,
        currentPeriod: 'home'
      }
    },
    thermostatSpecs: {
      tempRange: { min: 50, max: 85 },
      supportedModes: ['heat', 'cool', 'auto', 'off'],
      supportedFanModes: ['auto', 'on'],
      hasScheduling: true
    },
    hvacAnalytics: {
      runtime: {
        heating: 6.5, // hours today
        cooling: 0,
        idle: 17.5,
        efficiency: 'A+'
      },
      temperatureHistory: generateTemperatureHistory(),
      weeklyTrend: 'decreasing',
      energyUsage: {
        daily: 2.1, // kWh
        weekly: 14.7,
        monthly: 63
      }
    },
    lastActivity: '2025-09-19T10:15:00Z',
    connectionProtocol: 'wifi'
  },

  // Energy Monitor
  {
    id: 'main-energy-monitor',
    name: 'Main Energy Monitor',
    type: 'energymonitor',
    room: 'Utility',
    x: 0.61,
    y: 0.50,
    status: 'active',
    coreVital: {
      label: 'Real-time Usage',
      value: '1.2 kW',
      rawValue: 1200
    },
    battery: null,
    powerData: {
      current: 1200,
      daily: 28800,
      monthly: 864000,
      trend: 'up'
    },
    vitalsHistory: {
      energy: generateEnergyHistory(),
      powerConsumption: generatePowerHistory(1200, 'energymonitor')
    },
    // Energy Monitor-specific properties
    energyControls: {
      realTimeMonitoring: true,
      alertsEnabled: true,
      thresholds: {
        high: 2000, // watts
        critical: 3000
      }
    },
    applianceBreakdown: {
      hvac: { current: 450, percentage: 37.5, daily: 10.8 },
      waterHeater: { current: 320, percentage: 26.7, daily: 7.7 },
      lighting: { current: 180, percentage: 15.0, daily: 4.3 },
      appliances: { current: 150, percentage: 12.5, daily: 3.6 },
      other: { current: 100, percentage: 8.3, daily: 2.4 }
    },
    energyAnalytics: {
      realTimeUsage: 1200, // watts
      peakUsage: 2400,
      averageUsage: 850,
      costPerKwh: 0.12,
      currentCost: 0.144, // per hour
      dailyCost: 3.46,
      monthlyCost: 103.68,
      weeklyTrend: 'increasing',
      usageHistory: generateEnergyHistory(),
      anomalies: [
        { timestamp: '2025-09-18T14:30:00Z', usage: 2800, reason: 'AC spike' },
        { timestamp: '2025-09-17T22:15:00Z', usage: 1950, reason: 'Water heater' }
      ]
    },
    lastActivity: '2025-09-19T10:35:00Z',
    connectionProtocol: 'wifi'
  },

  // Smart Vacuum
  {
    id: 'robot-vacuum',
    name: 'Robot Vacuum',
    type: 'vacuum',
    room: 'Living Room',
    x: 0.51,
    y: 0.75,
    status: 'active',
    coreVital: {
      label: 'Status',
      value: 'Cleaning',
      rawValue: 1
    },
    battery: {
      level: 65,
      isCharging: false,
      lastCharged: '2025-09-19T06:00:00Z'
    },
    powerData: {
      current: 25,
      daily: 150,
      monthly: 4500,
      trend: 'stable'
    },
    vitalsHistory: {
      battery: generateBatteryHistory(),
      powerConsumption: generatePowerHistory(25, 'vacuum')
    },
    lastActivity: '2025-09-19T10:00:00Z',
    connectionProtocol: 'wifi'
  },

  // Smart Cameras
  {
    id: 'front-door-camera',
    name: 'Front Door Camera',
    type: 'camera_front',
    room: 'Entrance',
    x: 0.74,
    y: 0.05,
    status: 'active',
    coreVital: {
      label: 'Recording',
      value: 'Motion Detected',
      rawValue: 1
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
    // Camera-specific properties
    cameraControls: {
      isRecording: true,
      motionDetection: true,
      nightVision: false,
      audioRecording: true,
      quality: '1080p', // '720p', '1080p', '4K'
      status: 'live'
    },
    cameraSpecs: {
      resolutions: ['720p', '1080p', '4K'],
      hasNightVision: true,
      hasAudio: true,
      hasPanTilt: false,
      fieldOfView: 110
    },
    surveillance: {
      motionEvents: [
        { timestamp: '2025-09-19T10:32:00Z', type: 'person', confidence: 95, thumbnail: '/thumbnails/motion_001.jpg' },
        { timestamp: '2025-09-19T08:15:00Z', type: 'vehicle', confidence: 88, thumbnail: '/thumbnails/motion_002.jpg' },
        { timestamp: '2025-09-19T07:45:00Z', type: 'person', confidence: 92, thumbnail: '/thumbnails/motion_003.jpg' }
      ],
      recordings: [
        { timestamp: '2025-09-19T10:32:00Z', duration: 180, size: '45MB', type: 'motion' },
        { timestamp: '2025-09-19T08:15:00Z', duration: 120, size: '32MB', type: 'motion' },
        { timestamp: '2025-09-19T07:45:00Z', duration: 95, size: '28MB', type: 'continuous' }
      ],
      storageUsed: 2.4, // GB
      storageTotal: 32, // GB
      motionZones: [
        { id: 1, name: 'Walkway', active: true, sensitivity: 'medium' },
        { id: 2, name: 'Driveway', active: true, sensitivity: 'high' },
        { id: 3, name: 'Street', active: false, sensitivity: 'low' }
      ]
    },
    lastActivity: '2025-09-19T10:32:00Z',
    connectionProtocol: 'wifi'
  },

  {
    id: 'backyard-camera',
    name: 'Backyard Camera',
    type: 'camera',
    room: 'Backyard',
    x: 0.83,
    y: 0.94,
    status: 'active',
    coreVital: {
      label: 'Recording',
      value: 'Recording',
      rawValue: 1
    },
    battery: null,
    powerData: {
      current: 5.8,
      daily: 139.2,
      monthly: 4176,
      trend: 'stable'
    },
    vitalsHistory: {
      connectivity: generateConnectivityHistory(),
      powerConsumption: generatePowerHistory(5.8, 'camera')
    },
    lastActivity: '2025-09-19T10:30:00Z',
    connectionProtocol: 'wifi',
    // Camera-specific properties
    cameraControls: {
      isRecording: true,
      motionDetection: true,
      nightVision: true,
      audioRecording: false,
      quality: '4K', // '720p', '1080p', '4K'
      status: 'recording'
    },
    cameraSpecs: {
      resolutions: ['720p', '1080p', '4K'],
      hasNightVision: true,
      hasAudio: true,
      hasPanTilt: true,
      fieldOfView: 120
    },
    surveillance: {
      motionEvents: [
        { timestamp: '2025-09-19T10:30:00Z', type: 'person', confidence: 90, thumbnail: '/thumbnails/backyard_001.jpg' },
        { timestamp: '2025-09-19T09:20:00Z', type: 'vehicle', confidence: 75, thumbnail: '/thumbnails/backyard_002.jpg' },
        { timestamp: '2025-09-19T07:30:00Z', type: 'person', confidence: 85, thumbnail: '/thumbnails/backyard_003.jpg' }
      ],
      recordings: [
        { timestamp: '2025-09-19T10:30:00Z', duration: 240, size: '62MB', type: 'motion' },
        { timestamp: '2025-09-19T09:20:00Z', duration: 180, size: '48MB', type: 'motion' },
        { timestamp: '2025-09-19T07:30:00Z', duration: 150, size: '40MB', type: 'continuous' }
      ],
      storageUsed: 3.8, // GB
      storageTotal: 64, // GB
      motionZones: [
        { id: 1, name: 'Patio', active: true, sensitivity: 'high' },
        { id: 2, name: 'Garden', active: true, sensitivity: 'medium' },
        { id: 3, name: 'Fence Line', active: false, sensitivity: 'low' }
      ]
    }
  },

  // Smart Plugs
  {
    id: 'tv-smart-plug',
    name: 'Washing Machine Plug',
    type: 'smartplug',
    room: 'Living Room',
    x: 0.53,
    y: 0.90,
    status: 'active',
    coreVital: {
      label: 'Status',
      value: 'On',
      rawValue: 1
    },
    battery: null,
    powerData: {
      current: 120,
      daily: 2880,
      monthly: 86400,
      trend: 'stable'
    },
    vitalsHistory: {
      connectivity: generateConnectivityHistory(),
      powerConsumption: generatePowerHistory(120, 'smartplug')
    },
    lastActivity: '2025-09-19T09:15:00Z',
    connectionProtocol: 'wifi'
  },

  {
    id: 'coffee-maker-plug',
    name: 'Oven Plug',
    type: 'smartplug',
    room: 'Kitchen',
    x: 0.35,
    y: 0.88,
    status: 'inactive',
    coreVital: {
      label: 'Status',
      value: 'Off',
      rawValue: 0
    },
    battery: null,
    powerData: {
      current: 0,
      daily: 450,
      monthly: 13500,
      trend: 'down'
    },
    vitalsHistory: {
      connectivity: generateConnectivityHistory(),
      powerConsumption: generatePowerHistory(75, 'smartplug')
    },
    lastActivity: '2025-09-19T07:30:00Z',
    connectionProtocol: 'wifi'
  }
];

// Device type configurations - using custom PNG icons
export const DEVICE_ICONS = {
  gizmopod: gizmopodIcon,    // Using energy icon for gizmopod hub
  doorlock: doorlockIcon,
  light: lightIcon,
  speaker: speakerIcon,
  thermostat: thermostatIcon,
  energymonitor: energymonitorIcon,
  vacuum: vacuumIcon,
  camera: cameraIcon,
  camera_front: camera2Icon,  // Front door camera uses camera_2.png
  smartplug: smartplugIcon
}

