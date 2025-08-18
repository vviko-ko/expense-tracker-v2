import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const transactions = [
  { id: 1, description: "Grocery Store", amount: -87.32, category: "Food", date: "2024-01-15", type: "expense" },
  {
    id: 2,
    description: "Netflix Subscription",
    amount: -15.99,
    category: "Entertainment",
    date: "2024-01-14",
    type: "subscription",
  },
  { id: 3, description: "Gas Station", amount: -45.2, category: "Transportation", date: "2024-01-13", type: "expense" },
  { id: 4, description: "Coffee Shop", amount: -12.5, category: "Food", date: "2024-01-12", type: "expense" },
  {
    id: 5,
    description: "Spotify Premium",
    amount: -9.99,
    category: "Entertainment",
    date: "2024-01-11",
    type: "subscription",
  },
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-foreground">Recent Transactions</CardTitle>
          <CardDescription className="text-muted-foreground">
            Your latest expenses and subscription charges
          </CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{transaction.description}</span>
                  <Badge variant={transaction.type === "subscription" ? "secondary" : "outline"} className="text-xs">
                    {transaction.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{transaction.date}</p>
              </div>
              <span className="font-semibold text-red-500">${Math.abs(transaction.amount).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
