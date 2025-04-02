"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

// Simple utility to combine classNames
const combineClasses = (...classes: (string | undefined | boolean)[]) => {
  return classes.filter(Boolean).join(" ")
}

// Define base label styles directly instead of using cva
const labelBaseStyles = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root 
    ref={ref} 
    className={combineClasses(labelBaseStyles, className)} 
    {...props} 
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }