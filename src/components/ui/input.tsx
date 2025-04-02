"use client"

import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// Simple utility to combine classNames
const combineClasses = (...classes: (string | undefined | boolean)[]) => {
  return classes.filter(Boolean).join(" ")
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={combineClasses(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }