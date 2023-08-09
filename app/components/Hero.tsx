'use client'

import Image from "next/image"
import kobrasbanner from '@/public/kobrasbanner.png'


export default function Hero() {
  return(
    <Image src={kobrasbanner} alt="banner image of outgoing kobras" className="py-8 block"/>
  )
}
