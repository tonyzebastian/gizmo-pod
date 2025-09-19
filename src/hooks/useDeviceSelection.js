import { create } from 'zustand'

export const useDeviceSelection = create((set, get) => ({
  selectedDevice: null,

  // Select a device
  selectDevice: (device) => set({ selectedDevice: device }),

  // Clear selection
  clearSelection: () => set({ selectedDevice: null }),

  // Toggle device selection - if same device clicked, deselect it
  toggleDevice: (device) => {
    const { selectedDevice } = get()
    if (selectedDevice?.id === device.id) {
      set({ selectedDevice: null })
    } else {
      set({ selectedDevice: device })
    }
  },

  // Check if a device is selected
  isDeviceSelected: (deviceId) => {
    const { selectedDevice } = get()
    return selectedDevice?.id === deviceId
  }
}))