import { renderHook } from '@testing-library/react'
import { useCoordinates } from '../hooks/useCoordinates'

describe('useCoordinates', () => {
  const FLOOR_PLAN_WIDTH = 600
  const FLOOR_PLAN_HEIGHT = 400

  test('calculates floor plan position correctly for centered layout', () => {
    const canvasWidth = 1000
    const canvasHeight = 800

    const { result } = renderHook(() => useCoordinates(canvasWidth, canvasHeight))

    // Floor plan should be centered
    const expectedX = (canvasWidth - FLOOR_PLAN_WIDTH) / 2  // 200
    const expectedY = (canvasHeight - FLOOR_PLAN_HEIGHT) / 2  // 200

    expect(result.current.floorPlanX).toBe(expectedX)
    expect(result.current.floorPlanY).toBe(expectedY)
  })

  test('converts device relative coordinates to canvas coordinates', () => {
    const canvasWidth = 1000
    const canvasHeight = 800

    const { result } = renderHook(() => useCoordinates(canvasWidth, canvasHeight))

    const mockDevice = {
      x: 0.5,  // 50% from left
      y: 0.3   // 30% from top
    }

    const coords = result.current.deviceToCanvasCoords(mockDevice)

    // Expected calculations:
    // floorPlanX = 200, floorPlanY = 200
    // deviceX = 200 + (0.5 * 600) = 500
    // deviceY = 200 + (0.3 * 400) = 320

    expect(coords.x).toBe(500)
    expect(coords.y).toBe(320)
  })

  test('handles edge case device coordinates (0,0) and (1,1)', () => {
    const canvasWidth = 1000
    const canvasHeight = 800

    const { result } = renderHook(() => useCoordinates(canvasWidth, canvasHeight))

    // Top-left corner device (0,0)
    const topLeftDevice = { x: 0, y: 0 }
    const topLeftCoords = result.current.deviceToCanvasCoords(topLeftDevice)
    expect(topLeftCoords.x).toBe(200)  // floorPlanX
    expect(topLeftCoords.y).toBe(200)  // floorPlanY

    // Bottom-right corner device (1,1)
    const bottomRightDevice = { x: 1, y: 1 }
    const bottomRightCoords = result.current.deviceToCanvasCoords(bottomRightDevice)
    expect(bottomRightCoords.x).toBe(800)  // 200 + 600
    expect(bottomRightCoords.y).toBe(600)  // 200 + 400
  })

  test('calculates base image scale for cover behavior', () => {
    const canvasWidth = 1000
    const canvasHeight = 800

    const { result } = renderHook(() => useCoordinates(canvasWidth, canvasHeight))

    // Test with various base image dimensions

    // Landscape image
    const landscapeScale = result.current.getBaseImageScale(1920, 1080)
    expect(landscapeScale).toBe(Math.max(1000/1920, 800/1080))

    // Portrait image
    const portraitScale = result.current.getBaseImageScale(1080, 1920)
    expect(portraitScale).toBe(Math.max(1000/1080, 800/1920))

    // Square image
    const squareScale = result.current.getBaseImageScale(1000, 1000)
    expect(squareScale).toBe(Math.max(1000/1000, 800/1000))
  })

  test('handles small canvas dimensions correctly', () => {
    const canvasWidth = 400
    const canvasHeight = 300

    const { result } = renderHook(() => useCoordinates(canvasWidth, canvasHeight))

    // Floor plan larger than canvas should still position correctly
    const expectedX = (400 - 600) / 2  // -100
    const expectedY = (300 - 400) / 2  // -50

    expect(result.current.floorPlanX).toBe(expectedX)
    expect(result.current.floorPlanY).toBe(expectedY)

    // Device coordinates should still work
    const device = { x: 0.5, y: 0.5 }
    const coords = result.current.deviceToCanvasCoords(device)
    expect(coords.x).toBe(-100 + (0.5 * 600))  // 200
    expect(coords.y).toBe(-50 + (0.5 * 400))   // 150
  })

  test('recalculates when canvas dimensions change', () => {
    const initialProps = { canvasWidth: 800, canvasHeight: 600 }
    const { result, rerender } = renderHook(
      ({ canvasWidth, canvasHeight }) => useCoordinates(canvasWidth, canvasHeight),
      { initialProps }
    )

    const initialX = result.current.floorPlanX
    const initialY = result.current.floorPlanY

    // Change canvas dimensions
    rerender({ canvasWidth: 1200, canvasHeight: 900 })

    const newX = result.current.floorPlanX
    const newY = result.current.floorPlanY

    expect(newX).not.toBe(initialX)
    expect(newY).not.toBe(initialY)
    expect(newX).toBe((1200 - 600) / 2)  // 300
    expect(newY).toBe((900 - 400) / 2)   // 250
  })
})