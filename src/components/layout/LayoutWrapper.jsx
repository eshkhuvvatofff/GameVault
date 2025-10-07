"use client"
import { usePathname } from "next/navigation";
import ThreeJsScene from "@/components/custom-ui/prackricle-bg";
import { Flip, ToastContainer, toast } from 'react-toastify';
import { ThemeProvider } from "../theme-provider";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useState } from "react";

export default function LayoutWrapper({ children }) {
    const [themetype, setThemetype] = useState(typeof ThemeProvider)
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
                    <ToastContainer
                        autoClose={3000}
                        theme={themetype}
                        transition={Flip}
                    />
                    {!hideUi && <Navbar /> || <ThreeJsScene />}
                    {children}
                    {!hideUi && <Footer /> || <ThreeJsScene />}
                </ThemeProvider>

            </>
        )
}