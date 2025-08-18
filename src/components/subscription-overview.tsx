import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const subscriptions = [
  { name: "Netflix", amount: 15.99, status: "active", renewsIn: 12 },
  { name: "Spotify", amount: 9.99, status: "active", renewsIn: 3 },
  { name: "Adobe Creative", amount: 52.99, status: "active", renewsIn: 18 },
  { name: "GitHub Pro", amount: 4.0, status: "active", renewsIn: 7 },
]

export function SubscriptionOverview() {
  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.amount, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Subscription Overview</CardTitle>
        <CardDescription className="text-muted-foreground">
          Your active subscriptions and upcoming renewals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Monthly Total</span>
          <span className="text-lg font-semibold text-foreground">${totalMonthly.toFixed(2)}</span>
        </div>

        <div className="space-y-3">
          {subscriptions.map((sub, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{sub.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {sub.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Renews in {sub.renewsIn} days</p>
              </div>
              <span className="font-semibold text-foreground">${sub.amount}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
