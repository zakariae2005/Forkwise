"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ChefHat,
  Plus,
  Receipt,
  UtensilsCrossed,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, ResponsiveContainer, Bar, BarChart } from "recharts"

// Sample data for the last 7 days
const chartData = [
  { day: "Mon", income: 1200, expenses: 800 },
  { day: "Tue", income: 1500, expenses: 900 },
  { day: "Wed", income: 1100, expenses: 750 },
  { day: "Thu", income: 1800, expenses: 1000 },
  { day: "Fri", income: 2200, expenses: 1200 },
  { day: "Sat", income: 2800, expenses: 1400 },
  { day: "Sun", income: 2100, expenses: 1100 },
]

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

export default function RestaurantDashboard() {
  const todayIncome = 2800
  const todayExpenses = 1400
  const netProfit = todayIncome - todayExpenses
  const totalMenuItems = 47

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
            <div className="text-2xl font-bold text-gray-800 mb-1">💰 ${todayIncome.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12% from yesterday
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
            <div className="text-2xl font-bold text-gray-800 mb-1">💸 ${todayExpenses.toLocaleString()}</div>
            <div className="flex items-center text-xs text-red-600">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              +5% from yesterday
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
            <div className="text-2xl font-bold text-gray-800 mb-1">${netProfit.toLocaleString()}</div>
            <div className="flex items-center text-xs text-blue-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +18% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/40 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Menu Items</CardTitle>
            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
              <ChefHat className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 mb-1">{totalMenuItems}</div>
            <div className="flex items-center text-xs text-gray-500">
              <Plus className="h-3 w-3 mr-1" />2 added this week
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
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
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white shadow-lg">
                <DollarSign className="h-4 w-4 mr-2" />
                Add Income
              </Button>
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white shadow-lg">
                <Receipt className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
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