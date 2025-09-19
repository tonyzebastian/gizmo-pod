import React from 'react'
import { PageHeader } from '../layout/PageHeader'

export const ConfigSection = () => {
  return (
    <div className="h-full flex flex-col">
      <PageHeader title="Developer Tooling" />

      <div className="flex-1 p-4 md:p-6 pt-20 md:pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Developer Tools & Configuration
            </h3>
            <p className="text-slate-600 mb-4">
              Access advanced settings, API configurations, and developer utilities.
            </p>
            <div className="text-sm text-slate-500">
              Coming soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}