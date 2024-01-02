import { Inter } from 'next/font/google'
import './globals.css'

export const metadata = {
  title: 'Solar System Model',
  description: 'by Wilson Reeves',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="font-grotesk text-white bg-slate-950 h-full">{children}</body>
    </html>
  )
}
