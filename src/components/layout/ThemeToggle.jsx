"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const isLight = mounted ? resolvedTheme === "light" : false

    return (
        <button
            onClick={() => setTheme(isLight ? "dark" : "light")}
            className="relative inline-flex items-center justify-center rounded-md p-2 transition"
            aria-label="Toggle theme"
        >
            <span className="border-2 border-black cursor-pointer dark:border-white  rounded-md p-1.5 ">
                {isLight ? (
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-red-500" />
                ) : (
                    <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-yellow-200" />
                )}
            </span>
        </button>
    )
}
