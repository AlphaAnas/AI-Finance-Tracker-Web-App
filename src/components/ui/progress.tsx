"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

// Simple utility to combine classNames
const combineClasses = (...classes: (string | undefined | boolean)[]) => {
  return classes.filter(Boolean).join(" ")
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorClassName?: string
  }
>(({ className, value, indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={combineClasses(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    value={value} // Pass value to Radix component
    aria-valuenow={typeof value === 'number' ? value : undefined} // Ensure aria-valuenow is only set when value is a valid number
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={combineClasses(
        "h-full w-full flex-1 bg-primary transition-all",
        indicatorClassName
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }