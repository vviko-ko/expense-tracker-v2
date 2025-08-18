"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DollarSign, CreditCard, Calendar, Plus, PieChart, BarChart3 } from "lucide-react"
import { ExpenseChart } from "@/components/expense-chart"
import { RecentTransactions } from "@/components/recent-transactions"
import { SubscriptionOverview } from "@/components/subscription-overview"

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const router = useRouter()

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    const name = localStorage.getItem("userName") || "User"

    if (!authStatus) {
      router.push("/login")
      return
    }

    setIsAuthenticated(true)
    setUserName(name)
  }, [router])

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  const monthlyBudget = 0
  const currentSpending = 0
  const budgetProgress = 0

  return (
    <div className="min-h-screen">
      <div className="pt-16 md:pt-0">
        <main className="container mx-auto px-4 py-6 space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              Welcome back, {userName}!
            </h1>
            <p className="text-muted-foreground mt-2">Start by adding your expenses and subscriptions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-coral-500 to-coral-600 border-0 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-coral-100">Total Expenses</CardTitle>
                <DollarSign className="h-4 w-4 text-coral-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0</div>
                <p className="text-xs text-coral-100">
                  <span className="text-coral-200">No expenses yet</span>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-100">Monthly Budget</CardTitle>
                <PieChart className="h-4 w-4 text-purple-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0</div>
                <div className="mt-2 space-y-1">
                  <Progress value={0} className="h-2 bg-purple-400/30" />
                  <p className="text-xs text-purple-100">Set your budget in settings</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-100">Active Subscriptions</CardTitle>
                <CreditCard className="h-4 w-4 text-emerald-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-emerald-100">
                  <span className="text-emerald-200">No subscriptions added</span>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-500 to-amber-600 border-0 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-100">Monthly Subscriptions</CardTitle>
                <Calendar className="h-4 w-4 text-amber-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0</div>
                <p className="text-xs text-amber-100">
                  <span className="text-amber-200">No subscriptions yet</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExpenseChart />
            <SubscriptionOverview />
          </div>

          {/* Recent Transactions */}
          <RecentTransactions />

          <Card className="bg-gradient-to-r from-white to-teal-50/50 border-teal-200">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
              <CardDescription className="text-muted-foreground">
                Manage your expenses and subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  className="h-20 flex flex-col gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                  onClick={() => router.push("/expenses")}
                >
                  <Plus className="h-5 w-5" />
                  Add Expense
                </Button>
                <Button
                  className="h-20 flex flex-col gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                  onClick={() => router.push("/subscriptions")}
                >
                  <CreditCard className="h-5 w-5" />
                  Manage Subscriptions
                </Button>
                <Button
                  className="h-20 flex flex-col gap-2 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700"
                  onClick={() => router.push("/settings")}
                >
                  <BarChart3 className="h-5 w-5" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
