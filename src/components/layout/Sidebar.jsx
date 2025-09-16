import React from 'react'
import {
  Home,
  Cpu,
  GitBranch,
  Settings,
  Bell,
  User,
  Menu
} from 'lucide-react'
import { useAppNavigation } from '../../hooks/useAppNavigation'
import { cn } from '../../utils/cn'

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'devices', label: 'Devices', icon: Cpu },
  { id: 'flows', label: 'Flows', icon: GitBranch },
  { id: 'config', label: 'Config', icon: Settings },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile', label: 'Profile', icon: User }
]

export const Sidebar = () => {
  const { activeSection, isSidebarCollapsed, setActiveSection, toggleSidebar } = useAppNavigation()

  return (
    <div
      data-testid="sidebar"
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        isSidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header with toggle */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isSidebarCollapsed && (
          <h1 className="text-xl font-bold text-gray-900">GizmoPod</h1>
        )}
        <button
          data-testid="sidebar-toggle"
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigationItems.map((item) => {
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
    </div>
  )
}