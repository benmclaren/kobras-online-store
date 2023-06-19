import {motion} from 'framer-motion'
import {Player} from '@lottiefiles/react-lottie-player'
import order from "@/public/order.json"
import loading from "@/public/loading.json"

export default function OrderAnimation() {
  return(
    <div className="flex items-centr justify-center flex-col mt-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ delay: 0.5 }}
      >
      </motion.h1>
      <Player autoplay loop src={loading}></Player>
    </div>
  )
}
