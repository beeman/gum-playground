import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { GumFeature } from './gum/gum.feature'
import { NotFoundFeature } from './not-found.feature'
import { UiLayout } from './ui/ui-layout'

export function AppRoutes() {
  return (
    <UiLayout>
      <Routes>
        <Route index element={<GumFeature />} />
        <Route path="*" element={<NotFoundFeature />} />
      </Routes>
    </UiLayout>
  )
}
