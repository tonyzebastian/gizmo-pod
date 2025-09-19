export const ROOMS = [
  {
    id: 'living-room',
    name: 'Living Room',
    bounds: { x: 0.1, y: 0.3, width: 0.5, height: 0.5 },
    deviceCount: 5 // gizmopod-hub, living-room-light, living-room-thermostat, robot-vacuum, tv-smart-plug
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    bounds: { x: 0.6, y: 0.3, width: 0.35, height: 0.4 },
    deviceCount: 2 // kitchen-speaker, coffee-maker-plug
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    bounds: { x: 0.1, y: 0.8, width: 0.4, height: 0.15 },
    deviceCount: 1 // bedroom-light
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