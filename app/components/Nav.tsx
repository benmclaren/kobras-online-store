'use client'

import { Session } from "next-auth"
import { signIn, signOut } from 'next-auth/react'
import Image from "next/image"
import kobrasbadge from '/public/kobrasbadge.png'
import Link from "next/link"
import Cart from "./Cart"
import { useCartStore } from "@/store"
import { AiFillShopping } from "react-icons/ai"
import { BsFillPersonFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion"
import DarkLight from "./DarkLight"

export default function Nav({ user }: Session){
  const cartStore = useCartStore()
  return(
    <nav className="flex justify-between items-center py-2 md:py-8">
      <div className="flex justify-between">
        <Link href={"/"} className="hover:text-color-secondary transition duration-75">
          <h2 className="font-nohemi font-medium text-base md:text-xl pr-4 ">
            Home
          </h2>
        </Link>
        <Link href={"/products"} className="hover:text-color-secondary duration-75">
          <h2 className="font-nohemi font-medium text-base md:text-xl">
            Products
          </h2>
        </Link>
      </div>
      <img src="/kobrasbadge.png" alt="Outgoing Kobras FC badge" className="w-[80px] sm:w-[100px] md:w-[150px]"/>
      <ul className="flex items-center gap-2 md:gap-8">
        {/* Dark mode */}
        <DarkLight/>
        {/* If user is not signed in then show btn to sign in */}
        <li onClick={() => cartStore.toggleCart()} className="flex items-center text-3xl relative cursor-pointer">
          {/*  react shoping cart icon */}
          <AiFillShopping className="hover:text-color-secondary transition duration-75" />
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
        {!user && (
          <li className="flex items-center text-3xl relative cursor-pointer">
            <button onClick={() => signIn()}>
              <BsFillPersonFill className="hover:text-color-secondary transition duration-75" />
            </button>
          </li>
        )}
        {user && (
          <li className="flex">
            <div className="dropdown dropdown-end cursor-pointer">
              <Image 
                src={user?.image as string} 
                alt={user.name as string} 
                width={30} 
                height={30}
                className="rounded-full md:h-[36px] md:w-[36px] "
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
