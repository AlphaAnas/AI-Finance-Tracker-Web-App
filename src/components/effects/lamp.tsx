"use client"

import { useRef, useEffect } from "react"

export default function Lamp() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const move = (e: MouseEvent) => {
      el.style.setProperty("--x", `${e.clientX}px`)
      el.style.setProperty("--y", `${e.clientY}px`)
    }

    window.addEventListener("pointermove", move)
    return () => window.removeEventListener("pointermove", move)
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 [mask-image:radial-gradient(300px_circle_at_var(--x)_var(--y),white,transparent)]"
    >
      <div className="absolute h-[300px] w-[300px] rounded-full bg-emerald-400/20 blur-3xl" />
    </div>
  )
}
