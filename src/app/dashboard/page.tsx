"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Calendar, Plus, PieChart, BarChart3 } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
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

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/")
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  // Mock data for dashboard
  const monthlyBudget = 2500
  const currentSpending = 1847
  const budgetProgress = (currentSpending / monthlyBudget) * 100

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName={userName} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$1,847</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-500 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% from last month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Budget</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$2,500</div>
              <div className="mt-2 space-y-1">
                <Progress value={budgetProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">${monthlyBudget - currentSpending} remaining</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Subscriptions</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  -2 from last month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Subscriptions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$287</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-accent">Next renewal in 3 days</span>
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

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
            <CardDescription className="text-muted-foreground">Manage your expenses and subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col gap-2" onClick={() => router.push("/expenses")}>
                <Plus className="h-5 w-5" />
                Add Expense
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 bg-transparent"
                onClick={() => router.push("/subscriptions")}
              >
                <CreditCard className="h-5 w-5" />
                Manage Subscriptions
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 bg-transparent"
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
  )
}
