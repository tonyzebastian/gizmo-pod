import React from 'react'
import comingSoonImage from '../../assets/coming_soon.png'

export const ConfigSection = () => {
  return (
    <div className="h-full bg-white flex items-center justify-center">
      <div className="text-center">
        <img
          src={comingSoonImage}
          alt="Coming Soon"
          className="mx-auto mb-8 max-w-md w-full"
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Developer tooling
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Access advanced settings, API configurations, and developer utilities. This feature will be available soon.
        </p>
      </div>
    </div>
  )
}