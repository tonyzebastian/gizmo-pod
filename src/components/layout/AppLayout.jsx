import React from 'react'
import { Sidebar } from './Sidebar'
import { ContentArea } from './ContentArea'

export const AppLayout = () => {
  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar />
      <ContentArea />
    </div>
  )
}