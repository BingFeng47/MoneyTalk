"use client"
import { useAccount } from "@/app/demo/layout";
import { Card, CardContent } from "@/components/ui/card"

// Define the CreditCard type
type CreditCard = {
  id: string;
  user_id: string;
  card_number: string;
  cardholder_name: string;
  credit_limit: number;
  current_balance: number;
  due_date: string;
  interest_rate: number;
  min_payment: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  bank: string;
}

const formatCardNumber = (number: string) => {
  return number.replace(/(\d{4})/g, '$1 ').trim()
}

export default function CreditCardDisplay({credit_cards}: {credit_cards: CreditCard[]}) {

  if (!credit_cards) {
    return <div className="text-center">No credit card data available.</div>
  }

  const {account} = useAccount();

  const filteredCards = account === 'all' ? credit_cards : credit_cards.filter(credit_card => credit_card.bank.toLowerCase() === account.toLowerCase());

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Credit Cards</h1>
      <div className="flex flex-row md:gap-10 gap-2 overflow-x-auto">
        {
          filteredCards.map((cardData) => (
        <Card className={`w-96 h-56 flex-shrink-0 text-white rounded-xl overflow-hidden shadow-lg ${cardData.bank.toLowerCase() === 'maybank' ? 'bg-gradient-to-br from-orange-400 via-yellow-500 to-yellow-300' : 'bg-gradient-to-br from-red-600 via-red-500 to-orange-400'}`}>
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
          <div className="text-lg font-semibold uppercase">{cardData.bank}</div>
          <div className={`w-12 h-12 rounded-full ${cardData.bank.toLowerCase() === 'maybank' ? 'bg-gradient-to-br from-red-600 via-orange-400 to-orange-200' : 'bg-gradient-to-br from-red-400 via-yellow-200 to-orange-200'}`}></div>
            </div>
            <div className="space-y-4">
          <div className="text-2xl tracking-wider" aria-label="Card number">
            {formatCardNumber(cardData.card_number)}
          </div>
          <div className="flex justify-between">
            <div>
              <div className="text-xs uppercase opacity-75">Card Holder</div>
              <div className="font-semibold">{cardData.cardholder_name}</div>
            </div>
            <div>
              <div className="text-xs uppercase opacity-75">Expires</div>
              <div className="font-semibold">12/28</div>
            </div>
          </div>
            </div>
          </CardContent>
        </Card>
          ))
        }
      </div>
        
        {
        filteredCards.map((cardData)=>(
      <div className="mt-8 space-y-4">
        <h1 className="uppercase text-xl font-bold text-muted-foreground">{cardData.bank}</h1>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2">Current Balance</h2>
              <p className="text-2xl font-bold">RM {cardData.current_balance.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2">Credit Limit</h2>
              <p className="text-2xl font-bold">RM {cardData.credit_limit.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between">
              <span>Due Date</span>
              <span className="font-semibold">{new Date(cardData.due_date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Minimum Payment</span>
              <span className="font-semibold">RM {cardData.min_payment.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Interest Rate</span>
              <span className="font-semibold">{cardData.interest_rate}%</span>
            </div>
          </CardContent>
        </Card>
      </div>
        ))
      }
    </div>
  )
}

