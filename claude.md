# GizmoPod Implementation Guidelines

## Implementation Status

**✅ Phase 1 Complete**: Core Layout & Navigation
- Working responsive sidebar with navigation
- Zustand state management
- Section switching and sidebar collapse
- All tests passing

**✅ Phase 2 Complete**: Overview Section
- Interactive metrics dashboard (Power Usage, Temperature, Air Quality)
- Chart.js line charts with time period selection (7D/30D/90D)
- Dynamic mock data generation with realistic patterns
- Automation flows preview
- All tests passing

**✅ Phase 3 Complete**: Multi-Layer SVG Floor Plan & Device Management
- Responsive floor plan with smart sizing (70-85% viewport utilization)
- CSS background image with proper viewport clipping
- Custom PNG device icons for professional appearance
- Interactive hover tooltips with enhanced vital representations
- Updated coordinate system with manually positioned devices
- Hidden room boundaries for cleaner visual presentation
- Mobile-optimized responsive design with 80% scaling
- Fixed header with sidebar-aware positioning
- Comprehensive device interaction and selection system

**✅ Phase 4 Complete**: Enhanced Device Types & Management
- 13 realistic smart home devices across 6 rooms
- Custom PNG icons for each device type
- Core vitals specific to each device functionality
- Manual positioning system for precise device placement
- Enhanced tooltip system with device-specific representations
- Battery override warnings for low-battery devices

**✅ Phase 5 Complete**: Comprehensive Device Detail Framework
- Device-specific controls and analytics for Smart Lights, Thermostat, Camera, and Energy Monitor
- Interactive control panels with real-time updates (toggles, sliders, mode selection)
- Advanced Chart.js visualizations (usage patterns, lifetime analytics, surveillance data)
- Unified design framework with consistent spacing and component architecture
- Enhanced sidebar with device-type integration and conditional control visibility
- Complete mock data enhancement for all device types with realistic properties

**🚧 Next Up**: Phase 6 - Grid View & Advanced Device Management

**Development Server**: Running at http://localhost:3002

## 1. Project Structure

```
gizmopod/
├── src/
│   ├── assets/
│   │   ├── devices/                     # Custom PNG device icons
│   │   │   ├── energy.png               # GizmoPod hub & energy monitor
│   │   │   ├── lock.png                 # Door lock
│   │   │   ├── light.png                # Smart lights
│   │   │   ├── speaker.png              # Smart speaker
│   │   │   ├── thermostat.png           # Thermostat
│   │   │   ├── vaccum.png               # Robot vacuum
│   │   │   ├── camera.png               # Security cameras
│   │   │   ├── camera_2.png             # Front door camera
│   │   │   └── plug.png                 # Smart plugs
│   │   ├── logo.png                     # App logo
│   │   └── avatar.png                   # User avatar
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx            # Main app wrapper with sidebar
│   │   │   ├── Sidebar.jsx              # Left navigation sidebar with profile menu
│   │   │   ├── ContentArea.jsx          # Dynamic content container
│   │   │   └── PageHeader.jsx           # Global page header component
│   │   ├── overview/
│   │   │   ├── OverviewSection.jsx      # Main overview container
│   │   │   ├── MetricsDashboard.jsx     # Top metrics toggles
│   │   │   ├── MetricChart.jsx          # Chart.js visualization
│   │   │   └── FlowsPreview.jsx         # Automation flows placeholders
│   │   ├── devices/
│   │   │   ├── DevicesSection.jsx       # Main devices container
│   │   │   ├── ViewToggle.jsx           # Spatial/Grid view switcher
│   │   │   ├── spatial/
│   │   │   │   ├── SpatialView.jsx      # Floor plan container
│   │   │   │   ├── FloorPlan.jsx        # Multi-layer SVG floor plan
│   │   │   │   ├── DeviceNode.jsx       # Individual device on floor plan
│   │   │   │   └── AddDeviceFloat.jsx   # Floating add device button
│   │   │   ├── grid/
│   │   │   │   ├── GridView.jsx         # Grid container with filtering
│   │   │   │   ├── RoomFilter.jsx       # Room filter dropdown
│   │   │   │   ├── DeviceTile.jsx       # Device grid tile component
│   │   │   │   └── AddDeviceGrid.jsx    # Integrated add device button
│   │   │   └── shared/
│   │   │       ├── DeviceSidebar.jsx    # Device detail sidebar
│   │   │       ├── DeviceHeader.jsx     # Sidebar device header
│   │   │       ├── VitalsSection.jsx    # Device vitals with charts
│   │   │       ├── PowerAnalytics.jsx   # Power consumption charts
│   │   │       └── DeviceControls.jsx   # Device action buttons
│   │   └── placeholders/
│   │       ├── FlowsSection.jsx         # Flows placeholder
│   │       ├── ConfigSection.jsx        # Configuration placeholder
│   │       ├── NotificationsSection.jsx # Notifications placeholder
│   │       └── ProfileSection.jsx       # Profile placeholder
│   ├── hooks/
│   │   ├── useAppNavigation.js          # Sidebar navigation state
│   │   ├── useDeviceSelection.js        # Device selection across views
│   │   ├── useViewMode.js               # Spatial/Grid view state
│   │   ├── useMetricData.js             # Chart data processing
│   │   ├── useCoordinates.js            # Floor plan coordinate system
│   │   └── useRoomFilter.js             # Room filtering logic
│   ├── utils/
│   │   ├── deviceConfig.js              # Device type configurations
│   │   ├── chartConfig.js               # Chart.js configurations
│   │   ├── coordinateUtils.js           # Spatial positioning helpers
│   │   └── constants.js                 # App constants and colors
│   ├── data/
│   │   ├── mockDevices.js              # Device mock data with vitals
│   │   ├── mockMetrics.js              # System metrics historical data
│   │   ├── mockPowerData.js            # Power consumption data
│   │   └── mockRooms.js                # Room definitions
│   └── styles/
│       ├── globals.css                  # Geist font import + Tailwind
│       └── chart-overrides.css          # Chart.js custom styling
```

## 2. Technology Stack Setup

### Dependencies Installation
```bash
# Core React
npm install react react-dom

# UI Framework & Styling
npm install @shadcn/ui tailwindcss @tailwindcss/typography
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react

# Charts
npm install chart.js react-chartjs-2

# State Management
npm install zustand

# Fonts
npm install @fontsource/geist-sans @fontsource/geist-mono

# Testing (for TDD)
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'geist': ['Geist Sans', 'system-ui', 'sans-serif'],
        'geist-mono': ['Geist Mono', 'monospace'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          700: '#0369a1',
        },
        device: {
          active: '#10b981',
          inactive: '#6b7280',
          error: '#ef4444',
        },
        light: '#f59e0b',
        speaker: '#06b6d4',
        purifier: '#8b5cf6',
        thermostat: '#f97316',
        camera: '#ef4444',
        gizmopod: '#3b82f6',
      }
    },
  },
  plugins: [],
}
```

## 3. Enhanced Data Models

### Enhanced Device Model with Custom Icons
```javascript
// src/data/mockDevices.js - Custom PNG Icon Imports
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

export const DEVICES = [
  // GizmoPod Hub
  {
    id: 'gizmopod-hub',
    name: 'GizmoPod Hub',
    type: 'gizmopod',
    room: 'Living Room',
    x: 0.525,   // Manually positioned coordinates
    y: 0.12,
    status: 'active',
    coreVital: {
      label: 'Internet',
      value: 'Strong',
      rawValue: 95
    },
    // ... power data and vitals history
  },

  // Door Lock - Core vital: Locked/Unlocked
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
    battery: { level: 85, isCharging: false },
    // ... additional config
  },

  // Smart Lights - Core vital: On/Off
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
    // ... additional config
  },

  // Smart Speaker - Core vital: Playing/Idle
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
    // ... additional config
  },

  // Thermostat - Core vital: Current → Target temp
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
    // ... additional config
  },

  // Energy Monitor - Core vital: Real-time consumption
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
    // ... additional config
  },

  // Smart Vacuum - Core vital: Cleaning/Idle/Charging/Stuck
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
    battery: { level: 65, isCharging: false },
    // ... additional config
  },

  // Smart Cameras - Core vital: Recording/Motion Detected
  {
    id: 'front-door-camera',
    name: 'Front Door Camera',
    type: 'camera_front',  // Uses camera_2.png icon
    room: 'Entrance',
    x: 0.74,
    y: 0.05,
    status: 'active',
    coreVital: {
      label: 'Recording',
      value: 'Motion Detected',
      rawValue: 1
    },
    // ... additional config
  },

  // Smart Plugs - Core vital: On/Off
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
    // ... additional config
  }
];

// Device Icon Configuration with Custom PNGs
export const DEVICE_ICONS = {
  gizmopod: gizmopodIcon,
  doorlock: doorlockIcon,
  light: lightIcon,
  speaker: speakerIcon,
  thermostat: thermostatIcon,
  energymonitor: energymonitorIcon,
  vacuum: vacuumIcon,
  camera: cameraIcon,
  camera_front: camera2Icon,
  smartplug: smartplugIcon
}
```

### System Metrics Model
```javascript
// src/data/mockMetrics.js
export const SYSTEM_METRICS = {
  powerUsage: {
    current: 1247,
    trend: 'up',
    change: '+12%',
    history: generatePowerHistory(30) // 30 days
  },
  temperature: {
    current: 72,
    trend: 'stable',
    change: '0°F',
    history: generateTemperatureHistory(30)
  },
  airQuality: {
    current: 15,
    trend: 'down',
    change: '-3 PPM',
    status: 'good',
    history: generateAirQualityHistory(30)
  }
};
```

### Room Configuration with 6 Zones
```javascript
// src/data/mockRooms.js
export const ROOMS = [
  {
    id: 'living-room',
    name: 'Living Room',
    bounds: { x: 0.1, y: 0.3, width: 0.5, height: 0.5 },
    deviceCount: 5 // gizmopod-hub, living-room-light, thermostat, vacuum, smart-plug
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    bounds: { x: 0.6, y: 0.3, width: 0.35, height: 0.4 },
    deviceCount: 2 // kitchen-speaker, oven-plug
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    bounds: { x: 0.1, y: 0.8, width: 0.4, height: 0.15 },
    deviceCount: 2 // bedroom-light-1, bedroom-light-2
  },
  {
    id: 'entrance',
    name: 'Entrance',
    bounds: { x: 0.4, y: 0.0, width: 0.2, height: 0.25 },
    deviceCount: 2 // front-door-lock, front-door-camera
  },
  {
    id: 'utility',
    name: 'Utility',
    bounds: { x: 0.0, y: 0.2, width: 0.08, height: 0.2 },
    deviceCount: 1 // main-energy-monitor
  },
  {
    id: 'backyard',
    name: 'Backyard',
    bounds: { x: 0.85, y: 0.75, width: 0.15, height: 0.25 },
    deviceCount: 1 // backyard-camera
  }
];
```

## 4. Multi-Layer SVG Floor Plan Architecture

### SVG Layer Structure
```javascript
// Floor plan constants
const FLOOR_PLAN_WIDTH = 600;
const FLOOR_PLAN_HEIGHT = 400;

// Layer rendering order (bottom to top):
// 1. Base Image (scales with canvas)
// 2. Floor Plan (fixed size, centered) 
// 3. Room Boundaries (relative to floor plan)
// 4. Devices (positioned relative to floor plan)
```

### Coordinate System Hook
```javascript
// src/hooks/useCoordinates.js
export const useCoordinates = (canvasWidth, canvasHeight) => {
  // Floor plan positioning (always centered)
  const floorPlanX = (canvasWidth - FLOOR_PLAN_WIDTH) / 2;
  const floorPlanY = (canvasHeight - FLOOR_PLAN_HEIGHT) / 2;
  
  // Convert device relative coords (0-1) to canvas coordinates
  const deviceToCanvasCoords = (device) => ({
    x: floorPlanX + (device.x * FLOOR_PLAN_WIDTH),
    y: floorPlanY + (device.y * FLOOR_PLAN_HEIGHT)
  });
  
  // Base image scaling
  const getBaseImageScale = (baseImageWidth, baseImageHeight) => {
    return Math.max(
      canvasWidth / baseImageWidth,
      canvasHeight / baseImageHeight
    );
  };
  
  return { 
    floorPlanX, 
    floorPlanY, 
    deviceToCanvasCoords, 
    getBaseImageScale 
  };
};
```

### Floor Plan Component Structure
```javascript
// src/components/devices/spatial/FloorPlan.jsx
export const FloorPlan = ({ selectedDevice, onDeviceSelect }) => {
  const canvasWidth = selectedDevice ? window.innerWidth * 0.6 : window.innerWidth;
  const canvasHeight = window.innerHeight;
  
  const { 
    floorPlanX, 
    floorPlanY, 
    deviceToCanvasCoords 
  } = useCoordinates(canvasWidth, canvasHeight);

  return (
    <svg width={canvasWidth} height={canvasHeight}>
      {/* Layer 1: Base Image (scales) */}
      <image 
        href="/assets/base-background.svg"
        width={canvasWidth} 
        height={canvasHeight}
        preserveAspectRatio="xMidYMid slice"
      />
      
      {/* Layer 2: Floor Plan (fixed size, centered) */}
      <image
        href="/assets/floor-plan.svg"
        x={floorPlanX}
        y={floorPlanY}
        width={FLOOR_PLAN_WIDTH}
        height={FLOOR_PLAN_HEIGHT}
      />
      
      {/* Layer 3: Room Boundaries */}
      {ROOMS.map(room => (
        <rect
          key={room.id}
          x={floorPlanX + (room.bounds.x * FLOOR_PLAN_WIDTH)}
          y={floorPlanY + (room.bounds.y * FLOOR_PLAN_HEIGHT)}
          width={room.bounds.width * FLOOR_PLAN_WIDTH}
          height={room.bounds.height * FLOOR_PLAN_HEIGHT}
          fill="none"
          stroke="#e5e7eb"
          strokeDasharray="5,5"
        />
      ))}
      
      {/* Layer 4: Devices */}
      {DEVICES.map(device => {
        const coords = deviceToCanvasCoords(device);
        return (
          <DeviceNode
            key={device.id}
            device={device}
            x={coords.x}
            y={coords.y}
            isSelected={selectedDevice?.id === device.id}
            onSelect={() => onDeviceSelect(device)}
          />
        );
      })}
    </svg>
  );
};
```

## 5. Core Component Implementation Guidelines

### Enhanced Device Node Component with Custom Icons
```javascript
// src/components/devices/spatial/DeviceNode.jsx
export const DeviceNode = ({ device, x, y, isSelected, onSelect, canvasWidth, showTooltipOnly = false }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  // Enhanced vital representation with device-specific formatting
  const getVitalRepresentation = (device) => {
    if (shouldShowBattery) {
      return `🔋 ${device.battery.level}%`
    }

    switch (device.type) {
      case 'light':
        return device.status === 'active' ? '🟢 On' : '⚫ Off'
      case 'speaker':
        return device.status === 'active' ? '🟢 Playing' : '⚫ Off'
      case 'thermostat':
        return `🌡️ ${device.coreVital.value}`
      case 'camera':
      case 'camera_front':
        return device.status === 'active' ? '🟢 Recording' : '⚫ Off'
      case 'doorlock':
        return device.coreVital.value === 'Locked' ? '🔒 Locked' : '🔓 Unlocked'
      case 'smartplug':
        return device.status === 'active' ? '🟢 On' : '⚫ Off'
      case 'vacuum':
        return device.status === 'active' ? '🟢 Active' : '⚫ Idle'
      case 'energymonitor':
        return `⚡ ${device.coreVital.value}`
      case 'gizmopod':
        return `🟢 ${device.coreVital.value}`
      default:
        return device.status === 'active' ? '🟢 Active' : '⚫ Inactive'
    }
  }

  // Custom PNG icon rendering
  const iconPath = DEVICE_ICONS[device.type] || DEVICE_ICONS.gizmopod
  const iconSize = 50 * (canvasWidth < 768 ? 0.8 : 1)

  return (
    <g
      data-testid={`device-node-${device.id}`}
      transform={`translate(${x}, ${y})`}
      onClick={onSelect}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Selection ring */}
      {isSelected && (
        <circle
          r={35 * scale}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={3 * scale}
        />
      )}

      {/* Custom PNG Device Icon */}
      <image
        x={showTooltip ? -(iconSize * 1.1)/2 : -iconSize/2}
        y={showTooltip ? -(iconSize * 1.1)/2 : -iconSize/2}
        width={showTooltip ? iconSize * 1.1 : iconSize}
        height={showTooltip ? iconSize * 1.1 : iconSize}
        href={iconPath}
        style={{
          filter: showTooltip
            ? 'drop-shadow(1px 0 0 #3b82f6) drop-shadow(-1px 0 0 #3b82f6) drop-shadow(0 1px 0 #3b82f6) drop-shadow(0 -1px 0 #3b82f6)'
            : 'drop-shadow(1px 0 0 #1a1a1a) drop-shadow(-1px 0 0 #1a1a1a) drop-shadow(0 1px 0 #1a1a1a) drop-shadow(0 -1px 0 #1a1a1a)',
          transition: 'width 0.2s ease-in-out, height 0.2s ease-in-out, filter 0.2s ease-in-out'
        }}
      />

      {/* Enhanced Tooltip */}
      {showTooltip && (
        <g transform={`translate(${x + 30}, ${y - 20})`}>
          <rect
            width="160"
            height="65"
            rx="8"
            fill="white"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <text x="12" y="18" fontSize="12" fill="#1f2937" fontWeight="600">
            {device.name}
          </text>
          <text x="12" y="35" fontSize="10" fill="#6b7280">
            {getVitalRepresentation(device)}
          </text>
          {/* Additional device-specific info */}
        </g>
      )}
    </g>
  );
};
```

### Manual Device Positioning System
```javascript
// Manual positioning guide - Edit coordinates in src/data/mockDevices.js
// Coordinate system: x: 0-1 (left to right), y: 0-1 (top to bottom)

// Example: Moving a device
{
  id: 'living-room-light',
  x: 0.30,    // 30% from left edge
  y: 0.23,    // 23% from top edge
  // ... rest of device config
}

// Room boundaries for reference:
// Living Room: x: 0.1-0.6, y: 0.3-0.8
// Kitchen: x: 0.6-0.95, y: 0.3-0.7
// Bedroom: x: 0.1-0.5, y: 0.8-0.95
// Entrance: x: 0.4-0.6, y: 0.0-0.25
// Utility: x: 0.0-0.08, y: 0.2-0.4
// Backyard: x: 0.85-1.0, y: 0.75-1.0
```

### State Management Hooks
```javascript
// src/hooks/useAppNavigation.js
import { create } from 'zustand';

export const useAppNavigation = create((set) => ({
  activeSection: 'overview',
  isSidebarCollapsed: false,
  setActiveSection: (section) => set({ activeSection: section }),
  toggleSidebar: () => set(state => ({ 
    isSidebarCollapsed: !state.isSidebarCollapsed 
  }))
}));

// src/hooks/useDeviceSelection.js
export const useDeviceSelection = create((set) => ({
  selectedDevice: null,
  selectDevice: (device) => set({ selectedDevice: device }),
  clearSelection: () => set({ selectedDevice: null })
}));

// src/hooks/useViewMode.js
export const useViewMode = create((set) => ({
  viewMode: 'spatial',
  setViewMode: (mode) => set({ viewMode: mode })
}));
```

## 6. TDD Implementation Plan

### Phase 1: Core Layout & Navigation ✅ COMPLETED
**Tests First:**
- ✅ AppLayout renders sidebar and content area
- ✅ Sidebar navigation state management
- ✅ Section switching functionality
- ✅ Sidebar collapse/expand behavior

**Implementation:**
1. ✅ Create AppLayout with sidebar structure
2. ✅ Implement Zustand navigation hook
3. ✅ Build Shadcn sidebar component
4. ✅ Add section routing logic

**Status:** All core navigation functionality working. Responsive sidebar with 6 sections (Overview, Devices, Flows, Config, Notifications, Profile). Zustand state management for navigation and sidebar collapse. Development server running at http://localhost:3001.

### Phase 2: Overview Section ✅ COMPLETED
**Tests First:**
- ✅ MetricsDashboard renders three clickable cards
- ✅ Active metric highlighting and selection
- ✅ Chart.js integration with mock data
- ✅ Time period selection and chart updates

**Implementation:**
1. ✅ Build metrics dashboard with toggles
2. ✅ Integrate Chart.js for trend visualization
3. ✅ Create mock system metrics data
4. ✅ Add flows preview placeholders

**Status:** Complete overview dashboard with interactive metric cards (Power Usage, Temperature, Air Quality), Chart.js line charts with 7D/30D/90D time periods, dynamic mock data generation, and automation flows preview. All tests passing.

### Phase 3: Multi-Layer SVG Floor Plan ✅ COMPLETED
**Tests First:**
- ✅ Coordinate system calculates positions correctly
- ✅ Floor plan renders at responsive size and center
- ✅ Background image fills viewport with proper clipping
- ✅ Device positioning relative to floor plan
- ✅ Responsive behavior on window resize

**Implementation:**
1. ✅ Create responsive coordinate conversion hook with screen-based scaling
2. ✅ Build multi-layer SVG structure with separated background handling
3. ✅ Implement device positioning system with updated coordinates
4. ✅ Hide room boundary rendering for cleaner appearance

**Major Changes Made:**
- **Responsive Design Revolution**: Completely refactored coordinate system to use percentage-based sizing (70% desktop, 75% tablet, 85% mobile) with minimum floor plan size of 900x600px
- **Background Optimization**: Separated background from SVG using CSS background-image with proper viewport clipping to eliminate horizontal scroll
- **Device Enhancement**: Replaced emoji icons with professional Lucide React icons, changed all device backgrounds to white with colored icons for visual consistency
- **Interactive Tooltips**: Moved device names and vitals from always-visible text to hover tooltips for cleaner presentation
- **Mobile Optimization**: Added 80% device scaling on mobile screens, responsive header with compact buttons
- **Coordinate Refinement**: Updated all device positions to be properly placed within room boundaries on the floor plan
- **Visual Cleanup**: Hidden dashed room boundary lines for cleaner, more professional appearance

**Status:** Complete responsive floor plan system with professional device representation, optimized background handling, and comprehensive mobile support. All core functionality working with improved UX/UI design.

### Phase 4: Device Management
**Tests First:**
- Device selection across spatial/grid views
- View mode toggle functionality
- Grid filtering by room
- Device sidebar slide-in behavior

**Implementation:**
1. Build spatial and grid view components
2. Create device selection state management
3. Add room filtering logic
4. Implement device detail sidebar

### Phase 5: Device Detail & Charts
**Tests First:**
- Sidebar displays device-specific data
- Chart.js integration for device vitals
- Power consumption visualization
- Battery override logic

**Implementation:**
1. Build device sidebar with vitals charts
2. Create power analytics components
3. Add device control placeholders
4. Implement battery warning system

### Phase 6: Integration & Polish
**Tests First:**
- End-to-end device selection workflow
- Cross-view state persistence
- Responsive design behavior
- Chart interactions and updates

**Implementation:**
1. Complete integration testing
2. Polish animations and transitions
3. Add placeholder sections
4. Final responsive adjustments