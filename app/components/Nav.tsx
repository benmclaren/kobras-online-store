'use client'

import { Session } from "next-auth"
import { signIn, signOut } from 'next-auth/react'
import Image from "next/image"
import kobrasbadge from '/public/kobrasbadge.png'
import Link from "next/link"
import Cart from "./Cart"
import { useCartStore } from "@/store"
import { AiFillShopping } from "react-icons/ai"
import { motion, AnimatePresence } from "framer-motion"
import DarkLight from "./DarkLight"


export default function Nav({ user }: Session){
  const cartStore = useCartStore()
  return(
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h1 className="font-roboto text-xl">
          KobraKards.
        </h1>
      </Link>
      <img src="/kobrasbadge.png" alt="" />
      <ul className="flex items-center gap-12">
        {/* If user is not signed in then show btn to sign in */}
        <li onClick={() => cartStore.toggleCart()} className="flex items-center text-3xl relative cursor-pointer">
          {/*  react shoping cart icon */}
          <AiFillShopping />
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span 
                animate={{scale: 1}} 
                initial={{scale:0}}
                className="bg-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center"
              >
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {/* Dark mode */}
        <DarkLight/>
        {!user && (
          <li className="bg-primary py-2 text-white px-4 rounded-md">
            <button onClick={() => signIn()}> Sign In</button>
          </li>
        )}
        {user && (
          <li>
            <div className="dropdown dropdown-end cursor-pointer">
              <Image 
                src={user?.image as string} 
                alt={user.name as string} 
                width={36} 
                height={36}
                className="rounded-full"
                tabIndex={0}
              />
              <ul 
                tabIndex={0} 
                className="dropdown-content menu p-4 space-y-4 shadow bg-base-100 rounded-box w-72" 
              >
                <Link 
                  className="hover:bg-base-300 p-4 rounded-md" 
                  href={'/dashboard'}
                  onClick={() => {
                    if(document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur()
                    }
                  }}
                >
                  Orders
                </Link>
                <li 
                  className="hover:bg-base-300 p-4 rounded-md"
                  onClick={() => {
                    signOut()
                    if(document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur()
                    }
                  }}
                >
                  Sign Out
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
      {/* If cart is open then show it on the screen */}
      <AnimatePresence>
        {cartStore.isOpen && <Cart />}
      </AnimatePresence>
    </nav>
  )
}
