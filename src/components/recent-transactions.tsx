import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const transactions: any[] = []

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
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No transactions yet</p>
              <p className="text-xs mt-1">Add your first expense to get started</p>
            </div>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border"
              >
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
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
