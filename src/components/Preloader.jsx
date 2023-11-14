import { useEffect, useState } from "react"
import { motion } from "framer-motion";

export const Preloader = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setTimeout(() => {

        }, 2000)
    })


    return (
        <motion.div className="bg-[#FF6F40]  xl:max-w-6xl h-[800px] border-4 border-black  rounded-2xl overflow-hidden mx-auto mt-3 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}>
            <div className="rounded-full border-black lg:w-[400px] lg:h-[400px] md:w-[325px] md:h-[325px]  h-[300px] w-[300px] bg-[#2E2E2E] relative z-0"><div className="bg-[#FF6F40] w-full lg:h-[20px] md:h-[16px] h-[12px] absolute m-0 top-[50%] translate-y-[-50%] z-0"><div className="absolute lg:h-[150px] lg:w-[150px] md:h-[120px] md:w-[120px] h-[105px] w-[105px] bg-[#FF6F40] rounded-full bg-gray m-0 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-0"><div className="absolute lg:h-[100px] lg:w-[100px] md:h-[80px] md:w-[85px] h-[70px] w-[70px] bg-[#2E2E2E] rounded-full m-0 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-10"></div></div></div></div>
        </motion.div>
    )

}