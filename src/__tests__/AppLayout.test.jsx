import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppLayout } from '../components/layout/AppLayout'

describe('AppLayout', () => {
  test('renders sidebar and content area', () => {
    render(<AppLayout />)

    // Check if sidebar is rendered
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()

    // Check if content area is rendered
    expect(screen.getByTestId('content-area')).toBeInTheDocument()
  })

  test('sidebar contains navigation sections', () => {
    render(<AppLayout />)

    const sidebar = screen.getByTestId('sidebar')

    // Check for navigation sections
    expect(sidebar).toHaveTextContent('Overview')
    expect(sidebar).toHaveTextContent('Devices')
    expect(sidebar).toHaveTextContent('Flows')
    expect(sidebar).toHaveTextContent('Config')
    expect(sidebar).toHaveTextContent('Notifications')
    expect(sidebar).toHaveTextContent('Profile')
  })

  test('content area displays active section content', () => {
    render(<AppLayout />)

    const contentArea = screen.getByTestId('content-area')

    // By default, overview section should be active
    expect(contentArea).toHaveTextContent('Overview Section')
  })

  test('clicking navigation items switches active section', async () => {
    const user = userEvent.setup()
    render(<AppLayout />)

    const contentArea = screen.getByTestId('content-area')

    // Initially shows overview
    expect(contentArea).toHaveTextContent('Overview Section')

    // Click devices navigation item
    const devicesNav = screen.getByTestId('nav-devices')
    await user.click(devicesNav)

    expect(contentArea).toHaveTextContent('Devices Section')

    // Click flows navigation item
    const flowsNav = screen.getByTestId('nav-flows')
    await user.click(flowsNav)

    expect(contentArea).toHaveTextContent('Flows Section')
  })

  test('active navigation item is highlighted', async () => {
    const user = userEvent.setup()
    render(<AppLayout />)

    const overviewNav = screen.getByTestId('nav-overview')
    const devicesNav = screen.getByTestId('nav-devices')

    // Initially overview should be active
    expect(overviewNav).toHaveClass('bg-primary-100')
    expect(devicesNav).not.toHaveClass('bg-primary-100')

    // Click devices
    await user.click(devicesNav)

    expect(overviewNav).not.toHaveClass('bg-primary-100')
    expect(devicesNav).toHaveClass('bg-primary-100')
  })
})