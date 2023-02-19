import { Anchor, Container, Stack, Text } from '@mantine/core'
import React from 'react'
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { GumFeature } from './gum/gum.feature'
import { NotFoundFeature } from './not-found.feature'
import { UiLayout } from './ui/layout'

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate replace to={'/dashboard'} />} />
      <Route element={<UiLayout />}>
        <Route
          path="/dashboard"
          element={
            <Container my="md">
              <GumFeature />
            </Container>
          }
        />
        <Route path="/demo/:path" element={<CatchAllFeature />} />
        <Route path="/demo/:path/:sub" element={<CatchAllFeature />} />
        <Route path="*" element={<NotFoundFeature />} />
      </Route>
    </Routes>
  )
}

export function CatchAllFeature() {
  const { path, sub } = useParams()
  return (
    <Container my="md">
      <Stack>
        <Text size="xl">
          You are at {path} {sub ? ` - ${sub}` : null}
        </Text>
        <Anchor component={Link} to="/" color="brand">
          Click here to go back to root page.
        </Anchor>
      </Stack>
    </Container>
  )
}
