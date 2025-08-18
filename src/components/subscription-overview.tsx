import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const subscriptions: any[] = []

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
          {subscriptions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No subscriptions yet</p>
              <p className="text-xs mt-1">Add your subscriptions to track recurring expenses</p>
            </div>
          ) : (
            subscriptions.map((sub, index) => (
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
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
