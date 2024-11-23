import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default function Analytics() {
  return (
    <div className="container mx-auto">
        <Card >
        <CardHeader>
          <CardTitle >Analytics</CardTitle>
          <CardDescription>AI Powered Analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="">
            {/* Transactions Section */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold">Transactions</h2>
              <ul className="list-disc pl-6">
                <li>Income sources include salary, bonuses, investment returns, and fund transfers.</li>
                <li>
                  Major expenses: Transportation (tolls, fuel), food and beverages, and goals/savings.
                </li>
                <li className="text-red-500 font-bold">
                  Anomalies detected: RM50,000 transaction for a "Luxury Yacht Purchase."
                </li>
              </ul>
            </section>

            {/* Fixed Deposits Section */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold">Fixed Deposits</h2>
              <p>
                Total of <strong>5 fixed deposits</strong> (active and withdrawn) across CIMB and Maybank
                with a value of <strong>RM34,000</strong>.
              </p>
              <p>Interest rates: 3.75% to 5.0%, Terms: 6 to 18 months.</p>
            </section>

            {/* Credit Cards Section */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold">Credit Cards</h2>
              <ul className="list-disc pl-6">
                <li>
                  CIMB card: Credit limit of RM5,000, Current balance of RM4,800.
                </li>
                <li>
                  Maybank card: Credit limit of RM10,000, Current balance of RM8,000.
                </li>
              </ul>
            </section>

            {/* Loans Section */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold">Loans</h2>
              <p>Total outstanding loans: <strong>RM267,500</strong>.</p>
              <ul className="list-disc pl-6">
                <li>Loans include home loan, car loan, education loan, and personal loans.</li>
                <li>Interest rates: 4.25% to 7.0%, Terms: 6 months to 40 years.</li>
              </ul>
            </section>

            {/* Goals and Savings Section */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold">Goals and Savings</h2>
              <ul className="list-disc pl-6">
                <li>Trip to China: RM1,032 saved.</li>
                <li>Tesla Model 3: RM1,000 saved.</li>
                <li>Mont Kiara Bungalow: RM195 saved.</li>
              </ul>
              <p>Regular contributions are made, with occasional withdrawals to fund goals.</p>
            </section>

            {/* Overall Financial Health Section */}
            <section>
              <h2 className="text-xl font-semibold">Overall Financial Health</h2>
              <p>
                The user has a relatively healthy financial position with a good mix of income sources,
                savings, and investments.
              </p>
              <ul className="list-disc pl-6">
                <li>
                  <span className="font-bold">Recommendation:</span> Consider consolidating or
                  refinancing loans to reduce interest burden.
                </li>
                <li>
                  Continue monitoring spending and savings to stay on track with financial goals.
                </li>
              </ul>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
