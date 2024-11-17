'use client'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import React from 'react'

function GoogleAnalyticsProvider() {
  return (
    <GoogleAnalytics trackPageViews />
  )
}

export default GoogleAnalyticsProvider