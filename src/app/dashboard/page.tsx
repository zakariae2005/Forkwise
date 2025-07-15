/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ChefHat,
  Plus,
  Receipt,
  UtensilsCrossed,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, ResponsiveContainer, Bar, BarChart } from "recharts"
import { useExpense } from "@/store/useExpense"
import { useIncome } from "@/store/useIncome"
import { useEffect, useMemo, useState } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(142, 76%, 36%)",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(346, 87%, 43%)",
  },
}

// Helper function to check if a date is today
const isToday = (date: string | number | Date) => {
  const today = new Date()
  const checkDate = new Date(date)
  return checkDate.toDateString() === today.toDateString()
}

// Helper function to get yesterday's date for comparison
const getYesterday = () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday.toDateString()
}

// Helper function to get day name from date
const getDayName = (date: string | number | Date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return days[new Date(date).getDay()]
}

// Helper function to get last 7 days
const getLast7Days = () => {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    days.push(date.toDateString())
  }
  return days
}

export default function RestaurantDashboard() {
  const { fetchExpenses, expenses, createExpense, isLoading: expenseLoading } = useExpense()
  const { fetchIncomes, incomes, createIncome, isLoading: incomeLoading } = useIncome()

  // Form states
  const [incomeDialogOpen, setIncomeDialogOpen] = useState(false)
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false)
  
  const [incomeForm, setIncomeForm] = useState({
    value: 0,
    note: "",
    date: new Date(),
  })
  
  const [expenseForm, setExpenseForm] = useState({
    value: 0,
    note: "",
    date: new Date(),
  })

  useEffect(() => {
    fetchExpenses()
    fetchIncomes()
  }, [fetchExpenses, fetchIncomes])

  // Generate dynamic chart data from database
  const chartData = useMemo(() => {
    const last7Days = getLast7Days()
    
    return last7Days.map(dateString => {
      const date = new Date(dateString)
      
      // Filter expenses and incomes for this specific date
      const dayExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date)
        return expenseDate.toDateString() === dateString
      })
      
      const dayIncomes = incomes.filter(income => {
        const incomeDate = new Date(income.date)
        return incomeDate.toDateString() === dateString
      })
      
      // Calculate totals for the day
      const totalExpenses = dayExpenses.reduce((sum, expense) => sum + expense.value, 0)
      const totalIncome = dayIncomes.reduce((sum, income) => sum + income.value, 0)
      
      return {
        day: getDayName(date),
        date: dateString,
        income: totalIncome,
        expenses: totalExpenses
      }
    })
  }, [expenses, incomes])

  // Calculate today's totals
  const todayStats = useMemo(() => {
    // Filter today's expenses and incomes
    const todayExpenses = expenses.filter(expense => isToday(expense.date))
    const todayIncomes = incomes.filter(income => isToday(income.date))
    
    // Calculate totals
    const totalExpenses = todayExpenses.reduce((sum, expense) => sum + expense.value, 0)
    const totalIncome = todayIncomes.reduce((sum, income) => sum + income.value, 0)
    const netProfit = totalIncome - totalExpenses

    return {
      totalIncome,
      totalExpenses,
      netProfit
    }
  }, [expenses, incomes])

  // Calculate yesterday's totals for comparison
  const yesterdayStats = useMemo(() => {
    const yesterday = getYesterday()
    
    const yesterdayExpenses = expenses.filter(expense => 
      new Date(expense.date).toDateString() === yesterday
    )
    const yesterdayIncomes = incomes.filter(income => 
      new Date(income.date).toDateString() === yesterday
    )
    
    const totalExpenses = yesterdayExpenses.reduce((sum, expense) => sum + expense.value, 0)
    const totalIncome = yesterdayIncomes.reduce((sum, income) => sum + income.value, 0)
    const netProfit = totalIncome - totalExpenses

    return {
      totalIncome,
      totalExpenses,
      netProfit
    }
  }, [expenses, incomes])

  // Calculate percentage changes
  const getPercentageChange = (today: number, yesterday: number) => {
    if (yesterday === 0) return today > 0 ? 100 : 0
    return ((today - yesterday) / yesterday) * 100
  }

  const incomeChange = getPercentageChange(todayStats.totalIncome, yesterdayStats.totalIncome)
  const expenseChange = getPercentageChange(todayStats.totalExpenses, yesterdayStats.totalExpenses)
  const profitChange = getPercentageChange(todayStats.netProfit, yesterdayStats.netProfit)

  const totalMenuItems = 47

  // Handle income form submission
  const handleIncomeSubmit = async () => {
    try {
      await createIncome({
        value: typeof incomeForm.value === 'string' ? parseFloat(incomeForm.value) : incomeForm.value,
        note: incomeForm.note,
        date: incomeForm.date,
      })
      toast.success("Income added successfully!")
      
      // Reset form and close dialog
      setIncomeForm({
        value: 0,
        note: "",
        date: new Date(),
      })
      setIncomeDialogOpen(false)
    } catch (error) {
      toast.error("Failed to add income")
    }
  }

  // Handle expense form submission
  const handleExpenseSubmit = async () => {
    try {
      await createExpense({
        value: typeof expenseForm.value === 'string' ? parseFloat(expenseForm.value) : expenseForm.value,
        note: expenseForm.note,
        date: expenseForm.date,
      })
      toast.success("Expense added successfully!")
      
      // Reset form and close dialog
      setExpenseForm({
        value: 0,
        note: "",
        date: new Date(),
      })
      setExpenseDialogOpen(false)
    } catch (error) {
      toast.error("Failed to add expense")
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="backdrop-blur-sm bg-white/30 rounded-2xl p-6 border border-white/20 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Good Morning, Maria! 👋</h1>
          <p className="text-lg text-gray-600 flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5" />
            Bella Vista Restaurant
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="backdrop-blur-sm bg-white/40 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today&apos;s Income</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              💰 ${todayStats.totalIncome.toLocaleString()}
            </div>
            <div className={`flex items-center text-xs ${incomeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {incomeChange >= 0 ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {incomeChange >= 0 ? '+' : ''}{incomeChange.toFixed(1)}% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/40 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today&apos;s Expenses</CardTitle>
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
              <TrendingDown className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              💸 ${todayStats.totalExpenses.toLocaleString()}
            </div>
            <div className={`flex items-center text-xs ${expenseChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              {expenseChange >= 0 ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {expenseChange >= 0 ? '+' : ''}{expenseChange.toFixed(1)}% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/40 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Net Profit</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              ${todayStats.netProfit.toLocaleString()}
            </div>
            <div className={`flex items-center text-xs ${profitChange >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {profitChange >= 0 ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {profitChange >= 0 ? '+' : ''}{profitChange.toFixed(1)}% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/40 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Menu Items</CardTitle>
            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
              <ChefHat className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 mb-1">{totalMenuItems}</div>
            <div className="flex items-center text-xs text-orange-600">
              <Plus className="h-3 w-3 mr-1" />
              3 new items this week
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section - Now Dynamic */}
        <div className="lg:col-span-2">
          <Card className="backdrop-blur-sm bg-white/40 border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Income vs Expenses (Last 7 Days)</CardTitle>
              <CardDescription className="text-gray-600">
                Daily comparison of your restaurant&apos;s financial performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                    <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="backdrop-blur-sm bg-white/40 border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Quick Actions</CardTitle>
              <CardDescription className="text-gray-600">Manage your restaurant operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Add Income Dialog */}
              <Dialog open={incomeDialogOpen} onOpenChange={setIncomeDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white shadow-lg">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Add Income
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-green-700">
                      <DollarSign className="h-5 w-5" />
                      Add New Income
                    </DialogTitle>
                    <DialogDescription>
                      Record a new income transaction for your restaurant.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="income-value">Amount ($)</Label>
                      <Input
                        id="income-value"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={incomeForm.value}
                        onChange={(e) => setIncomeForm({ ...incomeForm, value: parseFloat(e.target.value) || 0 })}
                        className="text-lg font-semibold"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="income-note">Note (Optional)</Label>
                      <Textarea
                        id="income-note"
                        placeholder="Add a description..."
                        value={incomeForm.note}
                        onChange={(e) => setIncomeForm({ ...incomeForm, note: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !incomeForm.date && "text-muted-foreground",
                            )}
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {incomeForm.date ? format(incomeForm.date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={incomeForm.date}
                            onSelect={(date) => date && setIncomeForm({ ...incomeForm, date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIncomeDialogOpen(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        disabled={incomeLoading}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={handleIncomeSubmit}
                      >
                        {incomeLoading ? "Adding..." : "Add Income"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Add Expense Dialog */}
              <Dialog open={expenseDialogOpen} onOpenChange={setExpenseDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white shadow-lg">
                    <Receipt className="h-4 w-4 mr-2" />
                    Add Expense
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-700">
                      <Receipt className="h-5 w-5" />
                      Add New Expense
                    </DialogTitle>
                    <DialogDescription>
                      Record a new expense transaction for your restaurant.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="expense-value">Amount ($)</Label>
                      <Input
                        id="expense-value"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={expenseForm.value}
                        onChange={(e) => setExpenseForm({ ...expenseForm, value: parseFloat(e.target.value) || 0 })}
                        className="text-lg font-semibold"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expense-note">Note (Optional)</Label>
                      <Textarea
                        id="expense-note"
                        placeholder="Add a description..."
                        value={expenseForm.note}
                        onChange={(e) => setExpenseForm({ ...expenseForm, note: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !expenseForm.date && "text-muted-foreground",
                            )}
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {expenseForm.date ? format(expenseForm.date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={expenseForm.date}
                            onSelect={(date) => date && setExpenseForm({ ...expenseForm, date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setExpenseDialogOpen(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        disabled={expenseLoading}
                        className="flex-1 bg-red-600 hover:bg-red-700"
                        onClick={handleExpenseSubmit}
                      >
                        {expenseLoading ? "Adding..." : "Add Expense"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg">
                <ChefHat className="h-4 w-4 mr-2" />
                Add Menu Item
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="backdrop-blur-sm bg-white/40 border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Recent Activity</CardTitle>
              <CardDescription className="text-gray-600">Latest updates to your restaurant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/50">
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <ChefHat className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">New menu item added</p>
                  <p className="text-xs text-gray-600">&quot;Truffle Pasta&quot; - $24.99</p>
                  <div className="flex items-center mt-1">
                    <Clock className="h-3 w-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/50">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">Income recorded</p>
                  <p className="text-xs text-gray-600">Table 12 - $156.50</p>
                  <div className="flex items-center mt-1">
                    <Clock className="h-3 w-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">4 hours ago</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/50">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <Receipt className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">Expense logged</p>
                  <p className="text-xs text-gray-600">Fresh ingredients - $89.30</p>
                  <div className="flex items-center mt-1">
                    <Clock className="h-3 w-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">6 hours ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}