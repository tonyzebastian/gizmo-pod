import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Sidebar } from '../components/layout/Sidebar'

describe('Sidebar', () => {
  test('renders in expanded state by default', () => {
    render(<Sidebar />)

    const sidebar = screen.getByTestId('sidebar')

    // Should show full width and navigation text
    expect(sidebar).not.toHaveClass('w-16')
    expect(sidebar).toHaveClass('w-64')
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Devices')).toBeInTheDocument()
  })

  test('collapses when toggle button is clicked', async () => {
    const user = userEvent.setup()
    render(<Sidebar />)

    const toggleButton = screen.getByTestId('sidebar-toggle')
    const sidebar = screen.getByTestId('sidebar')

    // Initially expanded
    expect(sidebar).toHaveClass('w-64')

    await user.click(toggleButton)

    // Should be collapsed
    expect(sidebar).toHaveClass('w-16')
  })

  test('expands when toggle button is clicked while collapsed', async () => {
    const user = userEvent.setup()
    render(<Sidebar />)

    const toggleButton = screen.getByTestId('sidebar-toggle')
    const sidebar = screen.getByTestId('sidebar')

    // Collapse first
    await user.click(toggleButton)
    expect(sidebar).toHaveClass('w-16')

    // Then expand
    await user.click(toggleButton)
    expect(sidebar).toHaveClass('w-64')
  })

  test('shows only icons when collapsed', async () => {
    const user = userEvent.setup()
    render(<Sidebar />)

    const toggleButton = screen.getByTestId('sidebar-toggle')

    await user.click(toggleButton)

    // Text should be hidden, but icons remain
    expect(screen.queryByText('Overview')).not.toBeInTheDocument()
    expect(screen.queryByText('Devices')).not.toBeInTheDocument()

    // Icons should still be visible (using data-testids for icon elements)
    expect(screen.getByTestId('icon-overview')).toBeInTheDocument()
    expect(screen.getByTestId('icon-devices')).toBeInTheDocument()
  })

  test('navigation still works when collapsed', async () => {
    const user = userEvent.setup()
    render(<Sidebar />)

    const toggleButton = screen.getByTestId('sidebar-toggle')

    // Collapse sidebar
    await user.click(toggleButton)

    // Click on devices icon
    const devicesIcon = screen.getByTestId('nav-devices')
    await user.click(devicesIcon)

    // Should still trigger navigation (this would be verified by checking active state)
    expect(devicesIcon).toHaveClass('bg-primary-100')
  })
})