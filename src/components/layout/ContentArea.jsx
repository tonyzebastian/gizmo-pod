import React from 'react'
import { useAppNavigation } from '../../hooks/useAppNavigation'
import { OverviewSection } from '../overview/OverviewSection'

const sectionComponents = {
  overview: () => <OverviewSection />,
  devices: () => <div>Devices Section</div>,
  flows: () => <div>Flows Section</div>,
  config: () => <div>Config Section</div>,
  notifications: () => <div>Notifications Section</div>,
  profile: () => <div>Profile Section</div>
}

export const ContentArea = () => {
  const { activeSection } = useAppNavigation()

  const SectionComponent = sectionComponents[activeSection] || sectionComponents.overview

  return (
    <div
      data-testid="content-area"
      className="flex-1 overflow-auto bg-gray-50 p-6"
    >
      <SectionComponent />
    </div>
  )
}