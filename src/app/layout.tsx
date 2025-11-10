import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ReduxProvider from "@/providers/ReduxProvider"
import ThemeProvider from "@/components/ThemeProvider"
import AuthInitializer from "@/components/AuthInitializer"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bcommerce - Built by Brook",
  description: "Modern eCommerce application built with Next.js by Brook",
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
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster position="top-right" />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}

