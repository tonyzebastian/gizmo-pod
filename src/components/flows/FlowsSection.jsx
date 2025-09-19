import React from 'react'
import { PageHeader } from '../layout/PageHeader'

export const FlowsSection = () => {
  return (
    <div className="h-full flex flex-col">
      <PageHeader title="Flows" />

      <div className="flex-1 p-4 md:p-6 pt-20 md:pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Automation Flows
            </h3>
            <p className="text-slate-600 mb-4">
              Create and manage automated workflows for your smart home devices.
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