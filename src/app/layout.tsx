import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css"
import { Sidebar } from "@/components/sidebar"

export const metadata: Metadata = {
  title: "ExpenseTracker - Manage Your Finances",
  description: "Track expenses and subscriptions with ease",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <div className="flex h-screen bg-gradient-to-br from-slate-50 to-teal-50/30">
          <Sidebar />
          <main className="flex-1 md:ml-64 overflow-auto">
            <div className="min-h-full bg-gradient-to-br from-white/80 to-teal-50/50 backdrop-blur-sm">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
