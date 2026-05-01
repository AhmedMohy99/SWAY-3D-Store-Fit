import './globals.css'

export const metadata = {
  title: 'Sway Maverick Studio - 3D Virtual Fitting Room',
  description: 'Professional 3D Virtual Fitting Room for Technical Streetwear',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
