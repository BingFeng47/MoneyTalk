import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default function Analytics() {
  return (
    <div className="container mx-auto">
        <Card >
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>AI Powered Analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            Content
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
