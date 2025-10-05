"use client"
import { usePathname } from "next/navigation";
import { ThemeProvider } from "../theme-provider";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function LayoutWrapper({ children }) {
    const usepath = usePathname()
    const hideUi = usepath === ("/notfound")
    return (
        <>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {!hideUi && <Navbar />}
                {children}
                {!hideUi && <Footer />}
            </ThemeProvider>

        </>
    )
}