import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Subodh Adhikari — Full-Stack Web Developer & DevOps',
  description:
    'I build, containerize, and deploy complete web applications — Spring Boot backends, Angular frontends, Dockerized, shipped via CI/CD to production.',
  keywords: ['Full-Stack Developer', 'DevOps', 'Spring Boot', 'Angular', 'Docker', 'Java'],
  authors: [{ name: 'Subodh Adhikari' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
