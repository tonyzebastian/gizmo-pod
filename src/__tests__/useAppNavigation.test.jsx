import { renderHook, act } from '@testing-library/react'
import { useAppNavigation } from '../hooks/useAppNavigation'

describe('useAppNavigation', () => {
  test('initializes with default state', () => {
    const { result } = renderHook(() => useAppNavigation())

    expect(result.current.activeSection).toBe('overview')
    expect(result.current.isSidebarCollapsed).toBe(false)
  })

  test('setActiveSection updates activeSection', () => {
    const { result } = renderHook(() => useAppNavigation())

    act(() => {
      result.current.setActiveSection('devices')
    })

    expect(result.current.activeSection).toBe('devices')
  })

  test('toggleSidebar toggles isSidebarCollapsed state', () => {
    const { result } = renderHook(() => useAppNavigation())

    expect(result.current.isSidebarCollapsed).toBe(false)

    act(() => {
      result.current.toggleSidebar()
    })

    expect(result.current.isSidebarCollapsed).toBe(true)

    act(() => {
      result.current.toggleSidebar()
    })

    expect(result.current.isSidebarCollapsed).toBe(false)
  })

  test('state persists across multiple hook instances', () => {
    const { result: result1 } = renderHook(() => useAppNavigation())

    act(() => {
      result1.current.setActiveSection('flows')
    })

    const { result: result2 } = renderHook(() => useAppNavigation())

    expect(result2.current.activeSection).toBe('flows')
  })
})