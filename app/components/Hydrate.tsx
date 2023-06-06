'use client'

import { ReactNode, useEffect, useState } from "react"

// This is basically to make sure zustand doesnt complain about hydration errors
export default function Hydrate({children}: {children: ReactNode}){
  const [isHydrated, setIsHydrated] = useState(false)
  
  // wait untill Nextjs rehydration completes
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  return <>{isHydrated ? <>{children}</> : <div>Loading...</div>}</>
}
