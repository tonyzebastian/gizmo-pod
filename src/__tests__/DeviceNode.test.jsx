import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DeviceNode } from '../components/devices/spatial/DeviceNode'

describe('DeviceNode', () => {
  const mockDevice = {
    id: 'test-device',
    name: 'Test Device',
    type: 'light',
    status: 'active',
    coreVital: {
      label: 'Brightness',
      value: 'Warm White 80%',
      rawValue: 80
    },
    battery: null
  }

  const renderDeviceNode = (props = {}) => {
    const defaultProps = {
      device: mockDevice,
      x: 300,
      y: 200,
      isSelected: false,
      onSelect: jest.fn(),
      ...props
    }

    return render(
      <svg>
        <DeviceNode {...defaultProps} />
      </svg>
    )
  }

  test('renders device node at specified coordinates', () => {
    renderDeviceNode()

    const deviceGroup = screen.getByTestId('device-node-test-device')
    expect(deviceGroup).toBeInTheDocument()
    expect(deviceGroup).toHaveAttribute('transform', 'translate(300, 200)')
  })

  test('displays device name and core vital', () => {
    renderDeviceNode()

    expect(screen.getByText('Test Device')).toBeInTheDocument()
    expect(screen.getByText('Warm White 80%')).toBeInTheDocument()
  })

  test('shows correct icon for device type', () => {
    renderDeviceNode()

    const deviceIcon = screen.getByTestId('device-icon')
    expect(deviceIcon).toHaveTextContent('💡')
  })

  test('displays active status with green ring', () => {
    renderDeviceNode()

    const statusRing = screen.getByTestId('status-ring')
    expect(statusRing).toHaveAttribute('stroke', '#10b981')
  })

  test('displays inactive status with gray ring', () => {
    const inactiveDevice = { ...mockDevice, status: 'inactive' }
    renderDeviceNode({ device: inactiveDevice })

    const statusRing = screen.getByTestId('status-ring')
    expect(statusRing).toHaveAttribute('stroke', '#6b7280')
  })

  test('shows selection ring when device is selected', () => {
    renderDeviceNode({ isSelected: true })

    const selectionRing = screen.getByTestId('selection-ring')
    expect(selectionRing).toBeInTheDocument()
    expect(selectionRing).toHaveAttribute('stroke', '#3b82f6')
    expect(selectionRing).toHaveAttribute('r', '35')
  })

  test('hides selection ring when device is not selected', () => {
    renderDeviceNode({ isSelected: false })

    const selectionRing = screen.queryByTestId('selection-ring')
    expect(selectionRing).not.toBeInTheDocument()
  })

  test('displays battery warning when battery is low', () => {
    const lowBatteryDevice = {
      ...mockDevice,
      battery: {
        level: 15,
        isCharging: false,
        lastCharged: '2025-09-17T22:00:00Z'
      }
    }

    renderDeviceNode({ device: lowBatteryDevice })

    expect(screen.getByText('Battery 15%')).toBeInTheDocument()
    expect(screen.queryByText('Warm White 80%')).not.toBeInTheDocument()

    const batteryText = screen.getByText('Battery 15%')
    expect(batteryText).toHaveClass('fill-red-600')
  })

  test('displays core vital when battery is not low', () => {
    const goodBatteryDevice = {
      ...mockDevice,
      battery: {
        level: 85,
        isCharging: false,
        lastCharged: '2025-09-17T22:00:00Z'
      }
    }

    renderDeviceNode({ device: goodBatteryDevice })

    expect(screen.getByText('Warm White 80%')).toBeInTheDocument()
    expect(screen.queryByText('Battery 85%')).not.toBeInTheDocument()
  })

  test('calls onSelect when clicked', async () => {
    const mockOnSelect = jest.fn()
    const user = userEvent.setup()

    renderDeviceNode({ onSelect: mockOnSelect })

    const deviceNode = screen.getByTestId('device-node-test-device')
    await user.click(deviceNode)

    expect(mockOnSelect).toHaveBeenCalledTimes(1)
  })

  test('applies correct device type color to background circle', () => {
    renderDeviceNode()

    const deviceBackground = screen.getByTestId('device-background')
    expect(deviceBackground).toHaveAttribute('fill', '#f59e0b')
  })

  test('maintains device node structure with all required elements', () => {
    renderDeviceNode({ isSelected: true })

    expect(screen.getByTestId('device-node-test-device')).toBeInTheDocument()
    expect(screen.getByTestId('selection-ring')).toBeInTheDocument()
    expect(screen.getByTestId('status-ring')).toBeInTheDocument()
    expect(screen.getByTestId('device-background')).toBeInTheDocument()
    expect(screen.getByTestId('device-icon')).toBeInTheDocument()
    expect(screen.getByTestId('device-name')).toBeInTheDocument()
    expect(screen.getByTestId('device-vital')).toBeInTheDocument()
  })
})