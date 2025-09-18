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
- Lucide React icons replacing emojis for professional appearance
- White device backgrounds with colored icons for visual distinction
- Interactive hover tooltips replacing always-visible text
- Updated coordinate system with devices properly positioned within floor plan
- Hidden room boundaries for cleaner visual presentation
- Mobile-optimized responsive design with 80% scaling
- Fixed header with sidebar-aware positioning
- Comprehensive device interaction and selection system

**🚧 Next Up**: Phase 4 - Device Management & Grid View

**Development Server**: Running at http://localhost:3001

## 1. Project Structure

```
gizmopod/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx            # Main app wrapper with sidebar
│   │   │   ├── Sidebar.jsx              # Left navigation sidebar (shadcn)
│   │   │   └── ContentArea.jsx          # Dynamic content container
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

### Device Model with Relative Positioning
```javascript
// src/data/mockDevices.js
export const DEVICES = [
  {
    id: 'gizmopod-hub',
    name: 'GizmoPod Hub',
    type: 'gizmopod',
    room: 'Living Room',
    // Relative coordinates (0-1) within floor plan
    x: 0.5,    // 50% from left edge of floor plan
    y: 0.4,    // 40% from top edge of floor plan
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
    lastActivity: '2025-09-16T10:30:00Z',
    connectionProtocol: 'ethernet'
  },
  
  {
    id: 'living-room-light',
    name: 'Living Room Light',
    type: 'light',
    room: 'Living Room',
    x: 0.25,   // 25% from left
    y: 0.3,    // 30% from top
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
    lastActivity: '2025-09-16T10:25:00Z',
    connectionProtocol: 'zigbee'
  },
  
  // Kitchen Speaker with battery override example
  {
    id: 'kitchen-speaker',
    name: 'Kitchen Speaker',
    type: 'speaker',
    room: 'Kitchen',
    x: 0.75,
    y: 0.6,
    status: 'active',
    coreVital: {
      label: 'Volume',
      value: '65%',
      rawValue: 65
    },
    battery: {
      level: 15,  // Low battery - will override core vital
      isCharging: false,
      lastCharged: '2025-09-15T22:00:00Z'
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
    lastActivity: '2025-09-16T10:28:00Z',
    connectionProtocol: 'wifi'
  }
];
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

### Room Configuration
```javascript
// src/data/mockRooms.js
export const ROOMS = [
  {
    id: 'living-room',
    name: 'Living Room',
    bounds: { x: 0.1, y: 0.1, width: 0.4, height: 0.6 }, // Relative to floor plan
    deviceCount: 4
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    bounds: { x: 0.5, y: 0.1, width: 0.4, height: 0.4 },
    deviceCount: 3
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    bounds: { x: 0.1, y: 0.7, width: 0.4, height: 0.25 },
    deviceCount: 2
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

### Device Node Component
```javascript
// src/components/devices/spatial/DeviceNode.jsx
export const DeviceNode = ({ device, x, y, isSelected, onSelect }) => {
  // Check if battery should override core vital
  const shouldShowBattery = device.battery && device.battery.level < 20;
  const displayVital = shouldShowBattery 
    ? `Battery ${device.battery.level}%`
    : device.coreVital.value;

  return (
    <g transform={`translate(${x}, ${y})`} onClick={onSelect}>
      {/* Selection ring */}
      {isSelected && (
        <circle r="35" fill="none" stroke="#3b82f6" strokeWidth="3" />
      )}
      
      {/* Status ring */}
      <circle
        r="28"
        fill="none"
        stroke={device.status === 'active' ? '#10b981' : '#6b7280'}
        strokeWidth="3"
      />
      
      {/* Device background */}
      <circle r="25" fill={DEVICE_COLORS[device.type]} opacity="0.9" />
      
      {/* Device icon */}
      <text textAnchor="middle" dy="0.35em" fontSize="20">
        {DEVICE_ICONS[device.type]}
      </text>
      
      {/* Device name */}
      <text textAnchor="middle" dy="45" fontSize="12" className="fill-gray-700">
        {device.name}
      </text>
      
      {/* Core vital or battery warning */}
      <text 
        textAnchor="middle" 
        dy="60" 
        fontSize="10"
        className={shouldShowBattery ? "fill-red-600" : "fill-gray-600"}
      >
        {displayVital}
      </text>
    </g>
  );
};
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