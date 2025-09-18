import { useMemo } from 'react'

// Minimum floor plan size constants
const MIN_FLOOR_PLAN_WIDTH = 900
const MIN_FLOOR_PLAN_HEIGHT = 600

export const useCoordinates = (canvasWidth, canvasHeight) => {
  return useMemo(() => {
    // Calculate responsive floor plan size based on screen size
    // Use different percentages for different screen sizes
    const isMobile = canvasWidth < 768
    const isTablet = canvasWidth >= 768 && canvasWidth < 1024

    let sizeMultiplier
    if (isMobile) {
      sizeMultiplier = 0.85 // Use more space on mobile
    } else if (isTablet) {
      sizeMultiplier = 0.75 // Medium space on tablet
    } else {
      sizeMultiplier = 0.7 // Desktop default
    }

    const responsiveWidth = Math.max(MIN_FLOOR_PLAN_WIDTH, canvasWidth * sizeMultiplier)
    const responsiveHeight = Math.max(MIN_FLOOR_PLAN_HEIGHT, canvasHeight * sizeMultiplier)

    // Floor plan positioning (always centered)
    const floorPlanX = (canvasWidth - responsiveWidth) / 2
    const floorPlanY = (canvasHeight - responsiveHeight) / 2

    // Convert device relative coords (0-1) to canvas coordinates
    const deviceToCanvasCoords = (device) => ({
      x: floorPlanX + (device.x * responsiveWidth),
      y: floorPlanY + (device.y * responsiveHeight)
    })

    // Base image scaling for cover behavior (scales to fill canvas)
    const getBaseImageScale = (baseImageWidth, baseImageHeight) => {
      return Math.max(
        canvasWidth / baseImageWidth,
        canvasHeight / baseImageHeight
      )
    }

    return {
      floorPlanX,
      floorPlanY,
      floorPlanWidth: responsiveWidth,
      floorPlanHeight: responsiveHeight,
      deviceToCanvasCoords,
      getBaseImageScale,
      needsScroll: responsiveWidth > canvasWidth || responsiveHeight > canvasHeight
    }
  }, [canvasWidth, canvasHeight])
}