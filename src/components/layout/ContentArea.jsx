import React from 'react'
import { useAppNavigation } from '../../hooks/useAppNavigation'
import { OverviewSection } from '../overview/OverviewSection'
import { DevicesSection } from '../devices/DevicesSection'
import { FlowsSection } from '../flows/FlowsSection'
import { ConfigSection } from '../config/ConfigSection'
import { ProfileSection } from '../profile/ProfileSection'

const sectionComponents = {
  overview: () => <OverviewSection />,
  devices: () => <DevicesSection />,
  flows: () => <FlowsSection />,
  config: () => <ConfigSection />,
  notifications: () => <div>Notifications handled by sidebar popover</div>,
  profile: () => <ProfileSection />
}

export const ContentArea = () => {
  const { activeSection } = useAppNavigation()

  const SectionComponent = sectionComponents[activeSection] || sectionComponents.overview

  return (
    <div
      data-testid="content-area"
      className="flex-1 overflow-hidden bg-gray-50"
    >
      <SectionComponent />
    </div>
  )
}