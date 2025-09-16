import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MetricChart } from '../components/overview/MetricChart'
import { SYSTEM_METRICS } from '../data/mockMetrics'

// Mock Chart.js
jest.mock('react-chartjs-2', () => ({
  Line: ({ data, options, ...props }) => (
    <div
      data-testid="line-chart"
      data-chart-type="line"
      data-chart-data={JSON.stringify(data)}
      data-chart-options={JSON.stringify(options)}
      {...props}
    >
      Chart Component
    </div>
  )
}))

describe('MetricChart', () => {

  test('renders chart container', () => {
    render(<MetricChart activeMetric="powerUsage" metricData={SYSTEM_METRICS} />)

    expect(screen.getByTestId('metric-chart-container')).toBeInTheDocument()
    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
  })

  test('displays chart with correct data for active metric', () => {
    render(<MetricChart activeMetric="powerUsage" metricData={SYSTEM_METRICS} />)

    const chart = screen.getByTestId('line-chart')
    const chartData = JSON.parse(chart.getAttribute('data-chart-data'))

    // Check that chart receives data structure (not exact values since they're dynamically generated)
    expect(chartData.datasets).toHaveLength(1)
    expect(chartData.datasets[0].data).toBeInstanceOf(Array)
    expect(chartData.datasets[0].data.length).toBeGreaterThan(0)
    expect(chartData.labels).toBeInstanceOf(Array)
    expect(chartData.labels.length).toBe(chartData.datasets[0].data.length)
  })

  test('renders time period selector', () => {
    render(<MetricChart activeMetric="powerUsage" metricData={SYSTEM_METRICS} />)

    expect(screen.getByTestId('time-period-selector')).toBeInTheDocument()
    expect(screen.getByText('7D')).toBeInTheDocument()
    expect(screen.getByText('30D')).toBeInTheDocument()
    expect(screen.getByText('90D')).toBeInTheDocument()
  })

  test('highlights active time period', () => {
    render(<MetricChart activeMetric="powerUsage" metricData={SYSTEM_METRICS} />)

    const sevenDayButton = screen.getByText('7D')
    const thirtyDayButton = screen.getByText('30D')

    // 7D should be active by default
    expect(sevenDayButton).toHaveClass('bg-primary-500', 'text-white')
    expect(thirtyDayButton).not.toHaveClass('bg-primary-500', 'text-white')
  })

  test('updates chart when time period changes', async () => {
    const user = userEvent.setup()
    render(<MetricChart activeMetric="powerUsage" metricData={SYSTEM_METRICS} />)

    const thirtyDayButton = screen.getByText('30D')
    await user.click(thirtyDayButton)

    // Should update active styling
    expect(thirtyDayButton).toHaveClass('bg-primary-500', 'text-white')
    expect(screen.getByText('7D')).not.toHaveClass('bg-primary-500', 'text-white')
  })

  test('shows metric title and current value', () => {
    render(<MetricChart activeMetric="powerUsage" metricData={SYSTEM_METRICS} />)

    expect(screen.getByText('Power Usage')).toBeInTheDocument()
    expect(screen.getByText('1,247 W')).toBeInTheDocument()
    expect(screen.getByText('+12%')).toBeInTheDocument()
  })

  test('applies correct chart styling and configuration', () => {
    render(<MetricChart activeMetric="powerUsage" metricData={SYSTEM_METRICS} />)

    const chart = screen.getByTestId('line-chart')
    const chartOptions = JSON.parse(chart.getAttribute('data-chart-options'))

    // Check chart configuration
    expect(chartOptions.responsive).toBe(true)
    expect(chartOptions.maintainAspectRatio).toBe(false)
    expect(chartOptions.plugins.legend.display).toBe(false)
  })
})