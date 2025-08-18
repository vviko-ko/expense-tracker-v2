"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Calendar, DollarSign, Edit, Trash2, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { AddSubscriptionModal } from "@/components/add-subscription-modal"
import { EditSubscriptionModal } from "@/components/edit-subscription-modal"

interface Subscription {
  id: number
  name: string
  amount: number
  billingCycle: "monthly" | "yearly" | "weekly"
  nextRenewal: string
  status: "active" | "paused" | "cancelled"
  category: string
  description?: string
}

const mockSubscriptions: Subscription[] = [
  {
    id: 1,
    name: "Netflix",
    amount: 15.99,
    billingCycle: "monthly",
    nextRenewal: "2024-02-15",
    status: "active",
    category: "Entertainment",
    description: "Premium streaming plan",
  },
  {
    id: 2,
    name: "Spotify",
    amount: 9.99,
    billingCycle: "monthly",
    nextRenewal: "2024-01-20",
    status: "active",
    category: "Entertainment",
    description: "Premium music streaming",
  },
  {
    id: 3,
    name: "Adobe Creative Cloud",
    amount: 52.99,
    billingCycle: "monthly",
    nextRenewal: "2024-02-05",
    status: "active",
    category: "Software",
    description: "Creative suite subscription",
  },
  {
    id: 4,
    name: "GitHub Pro",
    amount: 4.0,
    billingCycle: "monthly",
    nextRenewal: "2024-01-25",
    status: "active",
    category: "Software",
    description: "Developer tools",
  },
  {
    id: 5,
    name: "Gym Membership",
    amount: 29.99,
    billingCycle: "monthly",
    nextRenewal: "2024-01-30",
    status: "paused",
    category: "Health",
    description: "Local fitness center",
  },
  {
    id: 6,
    name: "Amazon Prime",
    amount: 139.0,
    billingCycle: "yearly",
    nextRenewal: "2024-06-15",
    status: "active",
    category: "Shopping",
    description: "Prime membership benefits",
  },
]

export default function SubscriptionsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions)
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>(mockSubscriptions)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null)
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

  useEffect(() => {
    let filtered = subscriptions

    if (searchTerm) {
      filtered = filtered.filter(
        (sub) =>
          sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((sub) => sub.status === statusFilter)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((sub) => sub.category === categoryFilter)
    }

    setFilteredSubscriptions(filtered)
  }, [subscriptions, searchTerm, statusFilter, categoryFilter])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/")
  }

  const handleAddSubscription = (newSubscription: Omit<Subscription, "id">) => {
    const subscription: Subscription = {
      ...newSubscription,
      id: Math.max(...subscriptions.map((s) => s.id)) + 1,
    }
    setSubscriptions([subscription, ...subscriptions])
    setIsAddModalOpen(false)
  }

  const handleEditSubscription = (updatedSubscription: Subscription) => {
    setSubscriptions(subscriptions.map((sub) => (sub.id === updatedSubscription.id ? updatedSubscription : sub)))
    setEditingSubscription(null)
  }

  const handleDeleteSubscription = (id: number) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id))
  }

  const handleToggleStatus = (id: number, newStatus: "active" | "paused" | "cancelled") => {
    setSubscriptions(subscriptions.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub)))
  }

  const categories = Array.from(new Set(subscriptions.map((s) => s.category)))
  const activeSubscriptions = subscriptions.filter((s) => s.status === "active")
  const totalMonthlyAmount = activeSubscriptions.reduce((sum, sub) => {
    const monthlyAmount =
      sub.billingCycle === "yearly" ? sub.amount / 12 : sub.billingCycle === "weekly" ? sub.amount * 4.33 : sub.amount
    return sum + monthlyAmount
  }, 0)

  const getDaysUntilRenewal = (renewalDate: string) => {
    const today = new Date()
    const renewal = new Date(renewalDate)
    const diffTime = renewal.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "paused":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "paused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName={userName} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Subscriptions</h1>
            <p className="text-muted-foreground">Manage your recurring subscriptions</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Subscription
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${totalMonthlyAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{activeSubscriptions.length} active subscriptions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{activeSubscriptions.length}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Paused</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {subscriptions.filter((s) => s.status === "paused").length}
              </div>
              <p className="text-xs text-muted-foreground">Temporarily paused</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Next Renewal</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {Math.min(...activeSubscriptions.map((s) => getDaysUntilRenewal(s.nextRenewal)))} days
              </div>
              <p className="text-xs text-muted-foreground">Until next charge</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Filter Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search subscriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Your Subscriptions</CardTitle>
            <CardDescription className="text-muted-foreground">
              {filteredSubscriptions.length} of {subscriptions.length} subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSubscriptions.map((subscription) => {
                const daysUntilRenewal = getDaysUntilRenewal(subscription.nextRenewal)
                const isRenewingSoon = daysUntilRenewal <= 7 && subscription.status === "active"

                return (
                  <div
                    key={subscription.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${isRenewingSoon ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950" : "border-border hover:bg-muted/50"}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(subscription.status)}
                        <div>
                          <h3 className="font-medium text-foreground">{subscription.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {subscription.category}
                            </Badge>
                            <Badge className={`text-xs ${getStatusColor(subscription.status)}`}>
                              {subscription.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{subscription.billingCycle}</span>
                          </div>
                          {subscription.description && (
                            <p className="text-xs text-muted-foreground mt-1">{subscription.description}</p>
                          )}
                          {subscription.status === "active" && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {isRenewingSoon ? (
                                <span className="text-yellow-600 font-medium">Renews in {daysUntilRenewal} days</span>
                              ) : (
                                `Next renewal: ${subscription.nextRenewal}`
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-lg font-semibold text-foreground">${subscription.amount}</span>
                        <p className="text-xs text-muted-foreground">/{subscription.billingCycle.slice(0, -2)}</p>
                      </div>
                      <div className="flex gap-1">
                        {subscription.status === "active" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleStatus(subscription.id, "paused")}
                            className="h-8 px-2 text-xs"
                          >
                            Pause
                          </Button>
                        )}
                        {subscription.status === "paused" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleStatus(subscription.id, "active")}
                            className="h-8 px-2 text-xs"
                          >
                            Resume
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingSubscription(subscription)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSubscription(subscription.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </main>

      <AddSubscriptionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSubscription}
      />

      {editingSubscription && (
        <EditSubscriptionModal
          subscription={editingSubscription}
          isOpen={!!editingSubscription}
          onClose={() => setEditingSubscription(null)}
          onSave={handleEditSubscription}
        />
      )}
    </div>
  )
}
