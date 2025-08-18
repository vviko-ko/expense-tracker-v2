import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, TrendingUp, Shield, Smartphone } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg">
              <Wallet className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              VFynn
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8">
            Take control of your finances with our powerful expense and subscription tracking platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-white to-teal-50/50 border-teal-200 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">Get Started</CardTitle>
              <CardDescription className="text-muted-foreground">
                Join thousands of users managing their finances smarter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-teal-300 text-teal-700 hover:bg-teal-50 bg-transparent"
              >
                <Link href="/signup">Create Account</Link>
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-coral-50 to-coral-100/50 border border-coral-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coral-500">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-coral-900">Smart Analytics</h3>
                <p className="text-sm text-coral-700">Track spending patterns and trends</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-900">Secure & Private</h3>
                <p className="text-sm text-purple-700">Your financial data is protected</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-emerald-900">Mobile Ready</h3>
                <p className="text-sm text-emerald-700">Access anywhere, anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
