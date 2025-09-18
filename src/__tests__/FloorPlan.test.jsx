import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FloorPlan } from '../components/devices/spatial/FloorPlan'

// Mock the useCoordinates hook
jest.mock('../hooks/useCoordinates', () => ({
  useCoordinates: jest.fn(() => ({
    floorPlanX: 200,
    floorPlanY: 150,
    deviceToCanvasCoords: jest.fn((device) => ({
      x: 200 + (device.x * 600),
      y: 150 + (device.y * 400)
    })),
    getBaseImageScale: jest.fn(() => 1.2)
  }))
}))

describe('FloorPlan', () => {
  const mockDevices = [
    {
      id: 'device-1',
      name: 'Test Device',
      type: 'light',
      x: 0.5,
      y: 0.3,
      status: 'active'
    }
  ]

  beforeEach(() => {
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800
    })
  })

  test('renders SVG canvas with correct dimensions', () => {
    render(<FloorPlan selectedDevice={null} onDeviceSelect={jest.fn()} />)

    const svg = screen.getByTestId('floor-plan-svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '1000') // full window width when no device selected
    expect(svg).toHaveAttribute('height', '800')
  })

  test('adjusts canvas width when device is selected', () => {
    const selectedDevice = { id: 'device-1' }
    render(<FloorPlan selectedDevice={selectedDevice} onDeviceSelect={jest.fn()} />)

    const svg = screen.getByTestId('floor-plan-svg')
    expect(svg).toHaveAttribute('width', '600') // 60% of window width when device selected
  })

  test('renders base background image with scaling', () => {
    render(<FloorPlan selectedDevice={null} onDeviceSelect={jest.fn()} />)

    const backgroundImage = screen.getByTestId('base-background')
    expect(backgroundImage).toBeInTheDocument()
    expect(backgroundImage).toHaveAttribute('href', '/src/assets/background.png')
    expect(backgroundImage).toHaveAttribute('width', '1000')
    expect(backgroundImage).toHaveAttribute('height', '800')
    expect(backgroundImage).toHaveAttribute('preserveAspectRatio', 'xMidYMid slice')
  })

  test('renders floor plan image at fixed size and centered position', () => {
    render(<FloorPlan selectedDevice={null} onDeviceSelect={jest.fn()} />)

    const floorPlanImage = screen.getByTestId('floor-plan-image')
    expect(floorPlanImage).toBeInTheDocument()
    expect(floorPlanImage).toHaveAttribute('href', '/src/assets/floor_plan.png')
    expect(floorPlanImage).toHaveAttribute('x', '200') // floorPlanX from mock
    expect(floorPlanImage).toHaveAttribute('y', '150') // floorPlanY from mock
    expect(floorPlanImage).toHaveAttribute('width', '600')
    expect(floorPlanImage).toHaveAttribute('height', '400')
  })

  test('renders room boundaries as dashed rectangles', () => {
    render(<FloorPlan selectedDevice={null} onDeviceSelect={jest.fn()} />)

    // Should render room boundary rectangles
    const roomBoundaries = screen.getAllByTestId(/room-boundary-/)
    expect(roomBoundaries.length).toBeGreaterThan(0)

    const firstRoom = roomBoundaries[0]
    expect(firstRoom).toHaveAttribute('fill', 'none')
    expect(firstRoom).toHaveAttribute('stroke', '#e5e7eb')
    expect(firstRoom).toHaveAttribute('stroke-dasharray', '5,5')
  })

  test('calculates room boundary positions relative to floor plan', () => {
    render(<FloorPlan selectedDevice={null} onDeviceSelect={jest.fn()} />)

    const livingRoomBoundary = screen.getByTestId('room-boundary-living-room')

    // Living room bounds: { x: 0.1, y: 0.1, width: 0.4, height: 0.6 }
    // Expected calculations: 200 + (0.1 * 600) = 260
    expect(livingRoomBoundary).toHaveAttribute('x', '260')
    expect(livingRoomBoundary).toHaveAttribute('y', '190') // 150 + (0.1 * 400)
    expect(livingRoomBoundary).toHaveAttribute('width', '240') // 0.4 * 600
    expect(livingRoomBoundary).toHaveAttribute('height', '240') // 0.6 * 400
  })

  test('renders device nodes at calculated positions', () => {
    const mockOnDeviceSelect = jest.fn()
    render(
      <FloorPlan
        selectedDevice={null}
        onDeviceSelect={mockOnDeviceSelect}
      />
    )

    // Should render device nodes for each device
    const deviceNodes = screen.getAllByTestId(/device-node-/)
    expect(deviceNodes.length).toBeGreaterThan(0)
  })

  test('calls onDeviceSelect when device node is clicked', async () => {
    const mockOnDeviceSelect = jest.fn()
    const user = userEvent.setup()

    render(
      <FloorPlan
        selectedDevice={null}
        onDeviceSelect={mockOnDeviceSelect}
      />
    )

    const deviceNode = screen.getByTestId('device-node-gizmopod-hub')
    await user.click(deviceNode)

    expect(mockOnDeviceSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'gizmopod-hub' })
    )
  })

  test('highlights selected device node', () => {
    const selectedDevice = { id: 'living-room-light', name: 'Living Room Light' }

    render(
      <FloorPlan
        selectedDevice={selectedDevice}
        onDeviceSelect={jest.fn()}
      />
    )

    const selectedDeviceNode = screen.getByTestId('device-node-living-room-light')
    expect(selectedDeviceNode).toHaveClass('selected')
  })

  test('renders layers in correct order (bottom to top)', () => {
    const { container } = render(<FloorPlan selectedDevice={null} onDeviceSelect={jest.fn()} />)

    const svg = container.querySelector('svg')
    const children = Array.from(svg.children)

    // Verify layer order:
    // 1. Base background image
    expect(children[0]).toHaveAttribute('data-testid', 'base-background')
    // 2. Floor plan image
    expect(children[1]).toHaveAttribute('data-testid', 'floor-plan-image')
    // 3. Room boundaries group
    expect(children[2]).toHaveAttribute('data-testid', 'room-boundaries')
    // 4. Devices group
    expect(children[3]).toHaveAttribute('data-testid', 'devices-group')
  })

  test('responds to window resize by recalculating dimensions', () => {
    const { rerender } = render(<FloorPlan selectedDevice={null} onDeviceSelect={jest.fn()} />)

    // Change window dimensions
    Object.defineProperty(window, 'innerWidth', { value: 1200 })
    Object.defineProperty(window, 'innerHeight', { value: 900 })

    rerender(<FloorPlan selectedDevice={null} onDeviceSelect={jest.fn()} />)

    const svg = screen.getByTestId('floor-plan-svg')
    expect(svg).toHaveAttribute('width', '1200')
    expect(svg).toHaveAttribute('height', '900')
  })
})