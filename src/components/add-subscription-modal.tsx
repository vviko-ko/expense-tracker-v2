"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface AddSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (subscription: {
    name: string
    amount: number
    billingCycle: "monthly" | "yearly" | "weekly"
    nextRenewal: string
    status: "active" | "paused" | "cancelled"
    category: string
    description?: string
  }) => void
}

const categories = [
  "Entertainment",
  "Software",
  "Health",
  "Shopping",
  "Education",
  "News",
  "Productivity",
  "Gaming",
  "Other",
]

export function AddSubscriptionModal({ isOpen, onClose, onAdd }: AddSubscriptionModalProps) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly" | "weekly">("monthly")
  const [nextRenewal, setNextRenewal] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !amount || !category || !nextRenewal) {
      return
    }

    onAdd({
      name,
      amount: Number.parseFloat(amount),
      billingCycle,
      nextRenewal,
      status: "active",
      category,
      description: description || undefined,
    })

    // Reset form
    setName("")
    setAmount("")
    setBillingCycle("monthly")
    setNextRenewal("")
    setCategory("")
    setDescription("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Subscription</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the details of your subscription below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              placeholder="e.g., Netflix, Spotify"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingCycle">Billing Cycle</Label>
              <Select
                value={billingCycle}
                onValueChange={(value: "monthly" | "yearly" | "weekly") => setBillingCycle(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nextRenewal">Next Renewal</Label>
              <Input
                id="nextRenewal"
                type="date"
                value={nextRenewal}
                onChange={(e) => setNextRenewal(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Additional details about this subscription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Subscription</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
