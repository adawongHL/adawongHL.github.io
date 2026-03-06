// components/ScrollBar.tsx (vertical)
"use client"

import { motion, useScroll } from "motion/react"

export default function ScrollBar() {
    const { scrollYProgress } = useScroll()

    return (
        <motion.div
            style={{
                scaleY: scrollYProgress,
                position: "fixed",
                top: 0,
                left: 0,
                width: 3,
                height: "100vh",
                backgroundColor: "var(--foreground)",
                transformOrigin: "0% 0%",
                zIndex: 9999,
            }}
        />
    )
}


