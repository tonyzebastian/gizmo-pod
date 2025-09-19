import React from 'react'
import comingSoonImage from '../../assets/coming_soon.png'

export const FlowsSection = () => {
  return (
    <div className="h-full bg-white flex items-center justify-center">
      <div className="text-center">
        <img
          src={comingSoonImage}
          alt="Coming Soon"
          className="mx-auto mb-8 max-w-md w-full"
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Automation flows
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Create and manage automated workflows for your smart home devices. This feature will be available soon.
        </p>
      </div>
    </div>
  )
}