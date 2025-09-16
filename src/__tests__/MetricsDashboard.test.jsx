import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MetricsDashboard } from '../components/overview/MetricsDashboard'

describe('MetricsDashboard', () => {
  test('renders three metric cards', () => {
    render(<MetricsDashboard />)

    // Check for the three main metrics
    expect(screen.getByTestId('metric-card-powerUsage')).toBeInTheDocument()
    expect(screen.getByTestId('metric-card-temperature')).toBeInTheDocument()
    expect(screen.getByTestId('metric-card-airQuality')).toBeInTheDocument()
  })

  test('displays metric names and values', () => {
    render(<MetricsDashboard />)

    // Check metric labels
    expect(screen.getByText('Power Usage')).toBeInTheDocument()
    expect(screen.getByText('Temperature')).toBeInTheDocument()
    expect(screen.getByText('Air Quality')).toBeInTheDocument()

    // Check metric values are displayed (specific values)
    expect(screen.getByText('1,247 W')).toBeInTheDocument() // Power in watts
    expect(screen.getByText('72 °F')).toBeInTheDocument() // Temperature in Fahrenheit
    expect(screen.getByText('15 PPM')).toBeInTheDocument() // Air quality in PPM
  })

  test('metric cards are clickable', async () => {
    const user = userEvent.setup()
    render(<MetricsDashboard />)

    const powerCard = screen.getByTestId('metric-card-powerUsage')
    const tempCard = screen.getByTestId('metric-card-temperature')
    const airCard = screen.getByTestId('metric-card-airQuality')

    // Cards should be clickable (have onClick handlers)
    expect(powerCard).toHaveClass('cursor-pointer')
    expect(tempCard).toHaveClass('cursor-pointer')
    expect(airCard).toHaveClass('cursor-pointer')

    // Should be able to click without errors
    await user.click(powerCard)
    await user.click(tempCard)
    await user.click(airCard)
  })

  test('displays trend indicators', () => {
    render(<MetricsDashboard />)

    // Should show trend change percentages
    expect(screen.getByText(/\+\d+%|\-\d+%|0%/)).toBeInTheDocument()

    // Should show trend direction indicators
    const trendElements = screen.getAllByTestId(/trend-/)
    expect(trendElements.length).toBeGreaterThan(0)
  })

  test('highlights active metric selection', async () => {
    const user = userEvent.setup()
    render(<MetricsDashboard />)

    const powerCard = screen.getByTestId('metric-card-powerUsage')
    const tempCard = screen.getByTestId('metric-card-temperature')

    // Initially, first metric should be active (power usage)
    expect(powerCard).toHaveClass('ring-2', 'ring-primary-500')
    expect(tempCard).not.toHaveClass('ring-2', 'ring-primary-500')

    // Click temperature card
    await user.click(tempCard)

    // Temperature should now be active
    expect(tempCard).toHaveClass('ring-2', 'ring-primary-500')
    expect(powerCard).not.toHaveClass('ring-2', 'ring-primary-500')
  })

  test('calls onMetricSelect when metric is clicked', async () => {
    const mockOnMetricSelect = jest.fn()
    const user = userEvent.setup()

    render(<MetricsDashboard onMetricSelect={mockOnMetricSelect} />)

    const tempCard = screen.getByTestId('metric-card-temperature')
    await user.click(tempCard)

    expect(mockOnMetricSelect).toHaveBeenCalledWith('temperature')
  })

  test('shows active metric in visual hierarchy', async () => {
    const user = userEvent.setup()
    render(<MetricsDashboard />)

    const airCard = screen.getByTestId('metric-card-airQuality')

    await user.click(airCard)

    // Active card should have enhanced styling
    expect(airCard).toHaveClass('bg-white')
    expect(airCard).toHaveClass('shadow-lg')
  })
})