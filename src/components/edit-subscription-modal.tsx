"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

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

interface EditSubscriptionModalProps {
  subscription: Subscription
  isOpen: boolean
  onClose: () => void
  onSave: (subscription: Subscription) => void
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

export function EditSubscriptionModal({ subscription, isOpen, onClose, onSave }: EditSubscriptionModalProps) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly" | "weekly">("monthly")
  const [nextRenewal, setNextRenewal] = useState("")
  const [status, setStatus] = useState<"active" | "paused" | "cancelled">("active")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (subscription) {
      setName(subscription.name)
      setAmount(subscription.amount.toString())
      setBillingCycle(subscription.billingCycle)
      setNextRenewal(subscription.nextRenewal)
      setStatus(subscription.status)
      setCategory(subscription.category)
      setDescription(subscription.description || "")
    }
  }, [subscription])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !amount || !category || !nextRenewal) {
      return
    }

    onSave({
      ...subscription,
      name,
      amount: Number.parseFloat(amount),
      billingCycle,
      nextRenewal,
      status,
      category,
      description: description || undefined,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Subscription</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update the details of your subscription below.
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
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value: "active" | "paused" | "cancelled") => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
