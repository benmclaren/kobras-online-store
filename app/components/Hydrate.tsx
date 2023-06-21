'use client'

import { useThemestore } from "@/store"
import { ReactNode, useEffect, useState } from "react"

// This is basically to make sure zustand doesnt complain about hydration errors
export default function Hydrate({children}: {children: ReactNode}){
  const [isHydrated, setIsHydrated] = useState(false)
  const themeStore = useThemestore()
  
  // wait untill Nextjs rehydration completes
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  return <>{isHydrated ? <body className="px-4 lg:px-48 font-roboto" data-theme={themeStore.mode}>{children}</body> : <body></body>}</>
}
