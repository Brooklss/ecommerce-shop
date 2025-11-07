import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ReduxProvider from "@/providers/ReduxProvider"
import ThemeProvider from "@/components/ThemeProvider"
import AuthInitializer from "@/components/AuthInitializer"
import Navbar from "@/components/Navbar"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "eCommerce Shop",
  description: "Modern eCommerce application built with Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider>
            <AuthInitializer />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Toaster position="top-right" />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}

