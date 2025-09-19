import React, { useState, useRef, useEffect } from 'react'
import {
  Home,
  Cpu,
  GitBranch,
  Settings,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  Users,
  LogOut
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
  name: 'Tony Sebastian',
  email: 'tony@gizmopod.com',
  avatar: '/src/assets/avatar.png'
}

const profileMenuItems = [
  { id: 'profile-settings', label: 'Profile', icon: User },
  { id: 'user-management', label: 'Manage Users', icon: Users },
  { id: 'account-settings', label: 'Account Settings', icon: Settings },
  { id: 'logout', label: 'Log Out', icon: LogOut }
]

export const Sidebar = () => {
  const { activeSection, isSidebarCollapsed, setActiveSection, toggleSidebar } = useAppNavigation()
  const [isHoveringCollapsed, setIsHoveringCollapsed] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const profileMenuRef = useRef(null)
  const notificationsRef = useRef(null)

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleProfileMenuAction = (itemId) => {
    if (itemId === 'logout') {
      // Handle logout logic
      console.log('Logging out...')
    } else {
      // Navigate to profile section with specific subsection
      setActiveSection('profile')
    }
    setIsProfileMenuOpen(false)
  }

  return (
    <>
      <div
        data-testid="sidebar"
        className={cn(
          "bg-white border-r border-slate-200 flex flex-col transition-all duration-300",
          isSidebarCollapsed ? "w-16" : "w-60 md:w-56 lg:w-60"
        )}
      >
      {/* Header with toggle */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between h-16">
        {!isSidebarCollapsed ? (
          <div className="flex items-center">
            <img src="/src/assets/logo.png" alt="GizmoPod" className="w-5 h-5 object-contain" />
            <h1 className="ml-2 text-lg font-bold text-slate-900">GizmoPod</h1>
          </div>
        ) : (
          <button
            data-testid="app-icon-collapsed"
            onClick={toggleSidebar}
            onMouseEnter={() => setIsHoveringCollapsed(true)}
            onMouseLeave={() => setIsHoveringCollapsed(false)}
            className="p-1 rounded-md hover:bg-slate-100 transition-all duration-200"
          >
            {isHoveringCollapsed ? (
              <PanelLeftOpen size={20} className="text-slate-500 hover:text-slate-700" />
            ) : (
              <img src="/src/assets/logo.png" alt="GizmoPod" className="w-5 h-5 object-contain" />
            )}
          </button>
        )}
        {!isSidebarCollapsed && (
          <button
            data-testid="sidebar-toggle"
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-slate-100 transition-colors"
          >
            <PanelLeftClose size={20} className="text-slate-500 hover:text-slate-700"/>
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {mainNavigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              data-testid={`nav-${item.id}`}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-slate-200 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
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
      <div >
        {/* Bottom Navigation */}
        <nav className="px-2 py-3 space-y-1">
          {bottomNavigationItems.map((item) => {
            const Icon = item.icon
            const isActive = item.id === 'notifications' ? isNotificationsOpen : activeSection === item.id

            return (
              <div key={item.id} className="relative" ref={item.id === 'notifications' ? notificationsRef : null}>
                <button
                  data-testid={`nav-${item.id}`}
                  onClick={() => {
                    if (item.id === 'notifications') {
                      setIsNotificationsOpen(!isNotificationsOpen)
                    } else {
                      setActiveSection(item.id)
                    }
                  }}
                  className={cn(
                    "w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
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

                {/* Notifications Popover */}
                {item.id === 'notifications' && isNotificationsOpen && (
                  <div
                    className={cn(
                      "absolute z-50 bg-white border border-slate-200 rounded-lg shadow-lg w-64 py-8",
                      isSidebarCollapsed
                        ? "left-10 bottom-0"
                        : "left-48 bottom-0"
                    )}
                  >
                    <div className="p-4 text-center">
                      <Bell size={24} className="mx-auto mb-2 text-slate-400" />
                      <h3 className="text-sm font-semibold text-slate-900 mb-1">
                        No new notifications
                      </h3>
                      <p className="text-xs text-slate-500">
                        You're all caught up!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Profile Section */}
        <div className="px-2 py-3 border-t border-slate-100">
          <button
            data-testid="nav-profile"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className={cn(
              "w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
              activeSection === 'profile' || isProfileMenuOpen
                ? "bg-slate-100 text-slate-900"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              isSidebarCollapsed ? "justify-center" : "justify-start"
            )}
          >
            <div className={cn("flex items-center", isSidebarCollapsed ? "justify-center" : "justify-start")}>
              {isSidebarCollapsed ? (
                <img src={userProfile.avatar} alt="Tony Sebastian" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <>
                  <img src={userProfile.avatar} alt="Tony Sebastian" className="w-8 h-8 rounded-full object-cover  flex-shrink-0" />
                  <div className="flex flex-col items-start min-w-0 flex-1 ml-2">
                    <span className="text-sm font-medium text-slate-900 truncate">
                      {userProfile.name}
                    </span>
                    <span className="text-xs text-slate-500 truncate">
                      {userProfile.email}
                    </span>
                  </div>
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>

    {/* Profile Menu - Rendered outside sidebar */}
    {isProfileMenuOpen && (
      <div
        ref={profileMenuRef}
        className={cn(
          "fixed z-50 bg-white border border-slate-200 rounded-lg shadow-lg",
          isSidebarCollapsed
            ? "left-12 bottom-3 w-48 px-1"
            : "left-56 bottom-3 w-48 px-1"
        )}
      >
        <div className="py-2">
          {profileMenuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => handleProfileMenuAction(item.id)}
                className={cn(
                  "w-full flex items-center px-4 py-2 text-sm transition-colors",
                  item.id === 'logout'
                    ? "text-red-600 hover:bg-red-50"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                <Icon size={16} className="mr-3 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    )}
    </>
  )
}