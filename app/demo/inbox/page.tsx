'use client'
import { Button } from '@/components/ui/button'
import { AlertCircle, Bell, Check, Mail, Trash2, Badge } from 'lucide-react';
import React, { useState } from 'react'

type NotificationType = 'message' | 'alert' | 'update'

interface Notification {
  id: number
  type: NotificationType
  title: string
  description: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  { id: 1, type: 'message', title: 'New Message', description: 'You have a new message from Calvin', time: '5 minutes ago', read: false },
  { id: 2, type: 'alert', title: 'System Alert', description: 'Your account password will expire in 3 days', time: '1 hour ago', read: false },
  { id: 3, type: 'update', title: 'App Update', description: 'A new version of the app is available', time: '2 hours ago', read: false },
  { id: 4, type: 'message', title: 'New Message', description: 'You have a new message from Bing', time: '3 hours ago', read: true },
  { id: 5, type: 'alert', title: 'Security Alert', description: 'Unusual login activity detected', time: '1 day ago', read: true },
]

export default function Inbox() {
  
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'message': return <Mail className="h-4 w-4" />
      case 'alert': return <AlertCircle className="h-4 w-4" />
      case 'update': return <Bell className="h-4 w-4" />
    }
  }

  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)


  return (
    <div className='w-full'>
        <div className="flex-grow border-b py-6 sm:py-4 px-4">
            <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold pl-3 tracking-tight">Inbox</h1>
            </div>
        </div>

        <div className='p-4'>
        {notifications.map((notification) => (
              <div key={notification.id} className={`mb-4 p-4 rounded-lg ${notification.read ? 'bg-muted' : 'bg-primary/10'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getIcon(notification.type)}
                    <span className="font-semibold">{notification.title}</span>
                    {!notification.read && (
                      <p className='font-bold text-xs text-destructive'>New</p>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">{notification.time}</span>
                </div>
                <p className="text-sm mb-2">{notification.description}</p>
              </div>
            ))}
        </div>
    </div>

  )
}
