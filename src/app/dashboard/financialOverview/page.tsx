"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { CalendarDays, DollarSign, Plus, TrendingDown, TrendingUp, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useIncome } from "@/store/useIncome"
import { useExpense } from "@/store/useExpense"
import { toast } from "sonner"
import { IncomeData } from "@/types/income"
import { ExpenseData } from "@/types/expense"

export default function FinancialOverview() {
  const { incomes, isLoading: incomeLoading, error: incomeError, fetchIncomes, createIncome } = useIncome()
  const { expenses, isLoading: expenseLoading, error: expenseError, fetchExpenses, createExpense } = useExpense()
  
  const [activeTab, setActiveTab] = useState<"income" | "expense">("income")
  const [dateFilter, setDateFilter] = useState<Date | undefined>()
  
  // Form data state
  const [formData, setFormData] = useState<IncomeData | ExpenseData>({
    value: 0,
    note: "",
    date: new Date(),
  })

  // Fetch data on component mount
  useEffect(() => {
    fetchIncomes()
    fetchExpenses()
  }, [fetchIncomes, fetchExpenses])

  // Handle errors
  useEffect(() => {
    if (incomeError) {
      toast.error(`Income Error: ${incomeError}`)
    }
    if (expenseError) {
      toast.error(`Expense Error: ${expenseError}`)
    }
  }, [incomeError, expenseError])

  // Reset form when tab changes
  useEffect(() => {
    setFormData({
      value: 0,
      note: "",
      date: new Date(),
    })
  }, [activeTab])

  // Calculate monthly totals
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const monthlyIncome = Array.isArray(incomes) ? incomes
    .filter((income) => {
      const incomeDate = new Date(income.date)
      return incomeDate.getMonth() === currentMonth && incomeDate.getFullYear() === currentYear
    })
    .reduce((sum, income) => sum + income.value, 0) : 0

  const monthlyExpenses = Array.isArray(expenses) ? expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date)
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
    })
    .reduce((sum, expense) => sum + expense.value, 0) : 0

  const netProfit = monthlyIncome - monthlyExpenses

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (activeTab === "income") {
        await createIncome({
          value: typeof formData.value === 'string' ? parseFloat(formData.value) : formData.value,
          note: formData.note,
          date: formData.date,
        })
        toast.success("Income added successfully!")
      } else {
        await createExpense({
          value: typeof formData.value === 'string' ? parseFloat(formData.value) : formData.value,
          note: formData.note,
          date: formData.date,
        })
        toast.success("Expense added successfully!")
      }
      
      // Reset form
      setFormData({
        value: 0,
        note: "",
        date: new Date(),
      })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(`Failed to add ${activeTab}`)
    }
  }

  // Get filtered entries based on active tab
  const getFilteredEntries = () => {
    const entries = activeTab === "income" ? incomes : expenses
    
    // Ensure entries is an array
    if (!Array.isArray(entries)) {
      return []
    }
    
    return entries
      .filter((entry) => {
        if (!dateFilter) return true
        const entryDate = new Date(entry.date)
        return entryDate.toDateString() === dateFilter.toDateString()
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const filteredEntries = getFilteredEntries()
  const isLoading = incomeLoading || expenseLoading

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 flex items-center justify-center gap-2">
            <DollarSign className="h-8 w-8 text-emerald-600" />
            Financial Overview
          </h1>
          <p className="text-slate-600 text-lg">Track and manage all your incomes and expenses in one place</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-800">Total Income This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-700">${monthlyIncome.toLocaleString()}</div>
              <p className="text-xs text-emerald-600 mt-1">Current month total</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-800">Total Expenses This Month</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">${monthlyExpenses.toLocaleString()}</div>
              <p className="text-xs text-red-600 mt-1">Current month total</p>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "shadow-lg border-2",
              netProfit >= 0
                ? "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
                : "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200",
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={cn("text-sm font-medium", netProfit >= 0 ? "text-blue-800" : "text-orange-800")}>
                Net Profit This Month
              </CardTitle>
              <DollarSign className={cn("h-4 w-4", netProfit >= 0 ? "text-blue-600" : "text-orange-600")} />
            </CardHeader>
            <CardContent>
              <div className={cn("text-2xl font-bold", netProfit >= 0 ? "text-blue-700" : "text-orange-700")}>
                ${Math.abs(netProfit).toLocaleString()}
              </div>
              <p className={cn("text-xs mt-1", netProfit >= 0 ? "text-blue-600" : "text-orange-600")}>
                {netProfit >= 0 ? "Profit" : "Loss"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <Card className="lg:col-span-1 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Entry
              </CardTitle>
              <CardDescription>Record a new income or expense transaction</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "income" | "expense")}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="income" className="text-emerald-700 data-[state=active]:bg-emerald-100">
                    💰 Income
                  </TabsTrigger>
                  <TabsTrigger value="expense" className="text-red-700 data-[state=active]:bg-red-100">
                    💸 Expenses
                  </TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="value">Amount ($)</Label>
                    <Input
                      id="value"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                      className="text-lg font-semibold"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="note">Note (Optional)</Label>
                    <Textarea
                      id="note"
                      placeholder="Add a description..."
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
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
                            !formData.date && "text-muted-foreground",
                          )}
                        >
                          <CalendarDays className="mr-2 h-4 w-4" />
                          {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => date && setFormData({ ...formData, date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "w-full font-semibold",
                      activeTab === "income" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700",
                    )}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {isLoading ? "Adding..." : `Add ${activeTab === "income" ? "Income" : "Expense"}`}
                  </Button>
                </form>
              </Tabs>
            </CardContent>
          </Card>

          {/* History Section */}
          <Card className="lg:col-span-2 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">📊 Transaction History</CardTitle>
                  <CardDescription>View and manage your {activeTab} records</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter by Date
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
                      <div className="p-3 border-t">
                        <Button variant="outline" size="sm" onClick={() => setDateFilter(undefined)} className="w-full">
                          Clear Filter
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="font-semibold">Note</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8 text-slate-500">
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : filteredEntries.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8 text-slate-500">
                          No {activeTab} records found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEntries.map((entry) => (
                        <TableRow key={entry.id} className="hover:bg-slate-50">
                          <TableCell>
                            <div
                              className={cn(
                                "font-semibold text-lg",
                                activeTab === "income" ? "text-emerald-600" : "text-red-600",
                              )}
                            >
                              ${entry.value.toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <div className="truncate" title={entry.note}>
                              {entry.note || "No description"}
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-600">
                            📅 {format(new Date(entry.date), "MMM dd, yyyy")}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}