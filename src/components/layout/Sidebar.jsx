import React, { useState } from 'react'
import {
  Home,
  Cpu,
  GitBranch,
  Settings,
  Bell,
  Menu,
  ChevronRight,
  Zap
} from 'lucide-react'
import { useAppNavigation } from '../../hooks/useAppNavigation'
import { cn } from '../../utils/cn'

const mainNavigationItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'devices', label: 'Devices', icon: Cpu },
  { id: 'flows', label: 'Flows', icon: GitBranch },
  { id: 'config', label: 'Developer Tooling', icon: Settings }
]

const bottomNavigationItems = [
  { id: 'notifications', label: 'Notifications', icon: Bell }
]

const userProfile = {
  name: 'Tony Zeb',
  email: 'tony@gizmopod.com',
  avatar: 'TZ'
}

export const Sidebar = () => {
  const { activeSection, isSidebarCollapsed, setActiveSection, toggleSidebar } = useAppNavigation()
  const [isHoveringCollapsed, setIsHoveringCollapsed] = useState(false)

  return (
    <div
      data-testid="sidebar"
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        isSidebarCollapsed ? "w-16" : "w-64 md:w-56 lg:w-64"
      )}
    >
      {/* Header with toggle */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isSidebarCollapsed ? (
          <div className="flex items-center">
            <Zap size={24} className="text-primary-500 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">GizmoPod</h1>
          </div>
        ) : (
          <button
            data-testid="app-icon-collapsed"
            onClick={toggleSidebar}
            onMouseEnter={() => setIsHoveringCollapsed(true)}
            onMouseLeave={() => setIsHoveringCollapsed(false)}
            className="p-2 rounded-md hover:bg-gray-100 transition-all duration-200"
          >
            {isHoveringCollapsed ? (
              <ChevronRight size={20} className="text-primary-500" />
            ) : (
              <Zap size={20} className="text-primary-500" />
            )}
          </button>
        )}
        {!isSidebarCollapsed && (
          <button
            data-testid="sidebar-toggle"
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {mainNavigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              data-testid={`nav-${item.id}`}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                isSidebarCollapsed ? "justify-center" : "justify-start"
              )}
            >
              <Icon
                data-testid={`icon-${item.id}`}
                size={20}
                className={cn(
                  "flex-shrink-0",
                  !isSidebarCollapsed && "mr-3"
                )}
              />
              {!isSidebarCollapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-200">
        {/* Bottom Navigation */}
        <nav className="px-2 py-2 space-y-1">
          {bottomNavigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                data-testid={`nav-${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  isSidebarCollapsed ? "justify-center" : "justify-start"
                )}
              >
                <Icon
                  data-testid={`icon-${item.id}`}
                  size={20}
                  className={cn(
                    "flex-shrink-0",
                    !isSidebarCollapsed && "mr-3"
                  )}
                />
                {!isSidebarCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Profile Section */}
        <div className="px-2 py-2">
          <button
            data-testid="nav-profile"
            onClick={() => setActiveSection('profile')}
            className={cn(
              "w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
              activeSection === 'profile'
                ? "bg-primary-100 text-primary-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              isSidebarCollapsed ? "justify-center" : "justify-start"
            )}
          >
            {isSidebarCollapsed ? (
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                {userProfile.avatar}
              </div>
            ) : (
              <>
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-semibold mr-3 flex-shrink-0">
                  {userProfile.avatar}
                </div>
                <div className="flex flex-col items-start min-w-0 flex-1">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {userProfile.name}
                  </span>
                  <span className="text-xs text-gray-500 truncate">
                    {userProfile.email}
                  </span>
                </div>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}