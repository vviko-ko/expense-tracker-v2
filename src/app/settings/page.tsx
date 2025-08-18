"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Bell, Palette, DollarSign, Shield, Download, Upload, Trash2, Save, AlertTriangle } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

export default function SettingsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const router = useRouter()

  // Profile settings
  const [profileName, setProfileName] = useState("")
  const [profileEmail, setProfileEmail] = useState("")

  // App preferences
  const [theme, setTheme] = useState("system")
  const [currency, setCurrency] = useState("USD")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [weeklyReports, setWeeklyReports] = useState(true)

  // Budget settings
  const [monthlyBudget, setMonthlyBudget] = useState("2500")
  const [budgetAlerts, setBudgetAlerts] = useState(true)
  const [alertThreshold, setAlertThreshold] = useState("80")

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    const name = localStorage.getItem("userName") || "User"
    const email = localStorage.getItem("userEmail") || ""

    if (!authStatus) {
      router.push("/login")
      return
    }

    setIsAuthenticated(true)
    setUserName(name)
    setUserEmail(email)
    setProfileName(name)
    setProfileEmail(email)

    // Load saved preferences
    const savedTheme = localStorage.getItem("theme") || "system"
    const savedCurrency = localStorage.getItem("currency") || "USD"
    const savedBudget = localStorage.getItem("monthlyBudget") || "2500"

    setTheme(savedTheme)
    setCurrency(savedCurrency)
    setMonthlyBudget(savedBudget)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/")
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    setSaveMessage("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      localStorage.setItem("userName", profileName)
      localStorage.setItem("userEmail", profileEmail)
      setUserName(profileName)
      setUserEmail(profileEmail)

      setSaveMessage("Profile updated successfully!")
    } catch (error) {
      setSaveMessage("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSavePreferences = async () => {
    setIsLoading(true)
    setSaveMessage("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      localStorage.setItem("theme", theme)
      localStorage.setItem("currency", currency)
      localStorage.setItem("monthlyBudget", monthlyBudget)

      setSaveMessage("Preferences saved successfully!")
    } catch (error) {
      setSaveMessage("Failed to save preferences. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportData = () => {
    const data = {
      profile: { name: profileName, email: profileEmail },
      preferences: { theme, currency, monthlyBudget },
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "expense-tracker-data.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setSaveMessage("Data exported successfully!")
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      localStorage.clear()
      router.push("/")
    }
  }

  const initials = profileName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName={userName} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>

        {saveMessage && (
          <Alert>
            <AlertDescription>{saveMessage}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <User className="h-5 w-5" />
                Profile Settings
              </CardTitle>
              <CardDescription className="text-muted-foreground">Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-accent text-accent-foreground text-lg">{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">Profile Picture</p>
                  <Button variant="outline" size="sm" className="mt-1 bg-transparent">
                    Change Avatar
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileName">Full Name</Label>
                <Input
                  id="profileName"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileEmail">Email Address</Label>
                <Input
                  id="profileEmail"
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <Button onClick={handleSaveProfile} disabled={isLoading} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Profile"}
              </Button>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Palette className="h-5 w-5" />
                App Preferences
              </CardTitle>
              <CardDescription className="text-muted-foreground">Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="JPY">JPY (¥)</SelectItem>
                    <SelectItem value="CAD">CAD (C$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSavePreferences} disabled={isLoading} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Preferences"}
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription className="text-muted-foreground">Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch id="emailNotifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Browser push notifications</p>
                </div>
                <Switch id="pushNotifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weeklyReports">Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">Weekly spending summaries</p>
                </div>
                <Switch id="weeklyReports" checked={weeklyReports} onCheckedChange={setWeeklyReports} />
              </div>
            </CardContent>
          </Card>

          {/* Budget Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <DollarSign className="h-5 w-5" />
                Budget Settings
              </CardTitle>
              <CardDescription className="text-muted-foreground">Configure your budget and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyBudget">Monthly Budget</Label>
                <Input
                  id="monthlyBudget"
                  type="number"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(e.target.value)}
                  placeholder="Enter monthly budget"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="budgetAlerts">Budget Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when approaching budget limit</p>
                </div>
                <Switch id="budgetAlerts" checked={budgetAlerts} onCheckedChange={setBudgetAlerts} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alertThreshold">Alert Threshold (%)</Label>
                <Select value={alertThreshold} onValueChange={setAlertThreshold}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">50%</SelectItem>
                    <SelectItem value="70">70%</SelectItem>
                    <SelectItem value="80">80%</SelectItem>
                    <SelectItem value="90">90%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Shield className="h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription className="text-muted-foreground">Export, import, or delete your data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" onClick={handleExportData} className="flex items-center gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export Data
              </Button>

              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Upload className="h-4 w-4" />
                Import Data
              </Button>

              <Button variant="destructive" onClick={handleDeleteAccount} className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Button>
            </div>

            <Separator className="my-4" />

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Deleting your account will permanently remove all your data including expenses, subscriptions, and
                settings. This action cannot be undone.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
