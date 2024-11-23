'use client'
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
  { id: 1, type: 'alert', title: 'System Alert', description: 'Unusual activity detected: RM1,200 was charged to your account at a foreign merchant. Confirm if this was you.', time: '5 minutes ago', read: false },
  { id: 2, type: 'message', title: 'New Message', description: 'Your Netflix subscription of RM49.90 will be charged tomorrow. Review your recurring expenses in the subscriptions tab.', time: '5 minutes ago', read: false },
  { id: 3, type: 'alert', title: 'System Alert', description: 'You’ve spent 80% of your entertainment budget this month. Consider adjusting your spending to meet your savings goals.', time: '1 hour ago', read: false },
  { id: 4, type: 'update', title: 'New Message', description: 'Your investment in the ABC Equity Fund grew by 5.3% this quarter! View detailed insights in your portfolio.', time: '2 hours ago', read: false },
  { id: 5, type: 'message', title: 'New Message', description: 'You have a new message from Bing', time: '3 hours ago', read: true },
  { id: 6, type: 'message', title: 'System Alert', description: 'You spent RM350 on dining last week, 20% more than usual. See recommendations to cut costs.', time: '1 day ago', read: true },
  { id: 7, type: 'message', title: 'New Message', description: 'Congratulations! You’re 70% closer to reaching your vacation savings goal. Add RM200 this month to stay on track.', time: '16 day ago', read: true },
  { id: 8, type: 'message', title: 'New Message', description: 'A deposit of RM4,500 was received in your account from Maybank. Tap to view transaction details.', time: '16 day ago', read: true },
  { id: 9, type: 'message', title: 'New Message', description: 'Your credit card bill of RM2,000 is due in 5 days. Avoid late fees by making a payment today', time: '17 day ago', read: true },
  { id: 10, type: 'alert', title: 'Security Alert', description: 'Unusual login activity detected', time: '26 day ago', read: true },
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
            <h1 className="text-3xl font-bold pl-6 tracking-tight">Inbox</h1>
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
