import './globals.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { get } from 'http'
import Hydrate from './components/Hydrate'
import { Roboto, Lobster_Two } from "next/font/google"

// Define fonts
const roboto = Roboto({weight: ['400', '500', '700'], subsets:['latin'], variable:'--font-roboto'})
const lobster = Lobster_Two({weight: '700', subsets: ['latin'], variable:'--font-lobster'})

export const metadata = {
  title: 'Kobra Kards',
  description: 'Online store for Outgoing Kobras collectable cards',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  // console.log(session)
  return (
    <html className={`${roboto.variable} ${lobster.variable}`} lang="en">
      {/* adding global font */}  
        {/* {Passing nav the user and when the session expires} */}
      <Hydrate>
        <Nav user={session?.user} expires={session?.expires as string}/>
        {children}
        <Footer />
      </Hydrate>
    </html>
  )
}
