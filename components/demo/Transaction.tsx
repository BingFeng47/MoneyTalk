'use client'

import { useEffect, useState } from 'react'
import { CalendarIcon, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Calendar } from '../ui/calendar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useAccount, useSupabase } from '@/app/demo/layout'

interface transaction{
    id: number,
    user_id: number,
    date: string,
    amount: number,
    transaction_type: string,
    description: string,
    category: string,
    payment_method: string,
    bank: string,
}


export default function Transaction() {
  const supabase = useSupabase()
  const {account} = useAccount()

  const [date, setDate] = useState<Date>()
  const [transactions, setTransactions] = useState<transaction[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const itemsPerPage = 10
  const [page, setPage] = useState(1)
  const filteredBankTransaction = account === 'all' ? transactions : transactions.filter(transaction => transaction.bank.toLowerCase() === account.toLowerCase());
        const categories = Array.from(new Set(filteredBankTransaction.map(t => t.category)))
        const filteredTransactions = filteredBankTransaction.filter(transaction => {
          const dateMatch = !date || transaction.date === format(date, 'yyyy-MM-dd')
          const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(transaction.category)
          return dateMatch && categoryMatch
        })


    useEffect(() => {
        const fetchTransactions = async () => {
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .order('date', { ascending: false })

            if (error) {
                console.error('Error fetching transactions:', error)
            } else {
                setTransactions(data)
            }
        }

        fetchTransactions()

        
    }, [account])

  return (
    <div className="container mx-auto">
      <Card >
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View and filter your recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 bg-white z-50 rounded-lg border" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                />
              </PopoverContent>
            </Popover> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Categories <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) =>
                      setSelectedCategories(
                        checked
                          ? [...selectedCategories, category]
                          : selectedCategories.filter((c) => c !== category)
                      )
                    }
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Transaction</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className=' hidden md:block'>Payment Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              
            {filteredTransactions
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{format(new Date(transaction.date), 'yyyy-MM-dd')}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className=' '>{transaction.category}</TableCell>
                  <TableCell className=' hidden md:block pt-2 m-0'>{transaction.payment_method}</TableCell>
                  <TableCell className=' hidden md:block capitalize p-2 m-0'>{transaction.bank}</TableCell>
                  <TableCell className={`text-right ${
                    transaction.transaction_type === 'credit' ? 'text-green-600' : 'text-red-600'
                  } `}>
                    {transaction.transaction_type === 'credit' ? '+' : '-'}RM{transaction.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className='text-xs'>
              Page {page} of {Math.ceil(filteredBankTransaction.length / itemsPerPage)}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === Math.ceil(filteredBankTransaction.length / itemsPerPage)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}