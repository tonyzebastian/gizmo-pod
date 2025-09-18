export const ROOMS = [
  {
    id: 'living-room',
    name: 'Living Room',
    bounds: { x: 0.1, y: 0.1, width: 0.4, height: 0.6 }, // Relative to floor plan
    deviceCount: 3 // gizmopod-hub, living-room-light, living-room-purifier
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    bounds: { x: 0.5, y: 0.1, width: 0.4, height: 0.4 },
    deviceCount: 2 // kitchen-speaker, kitchen-camera
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    bounds: { x: 0.1, y: 0.7, width: 0.4, height: 0.25 },
    deviceCount: 1 // bedroom-thermostat
  }
];