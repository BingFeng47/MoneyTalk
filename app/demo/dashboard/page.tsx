'use client'
import { Dashboard } from '@/components/demo/Dashboard';
import React from 'react';
import { useAccount } from '../layout';

function DashboardPage() {
  const { account } = useAccount(); // Access account from context

  return (
    <div>
      <Dashboard account={account} />
    </div>
  );
}

export default DashboardPage;