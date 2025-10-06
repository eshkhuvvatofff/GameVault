import LayoutWrapper from "@/components/layout/LayoutWrapper";
import "./globals.css";

export const metadata = {
  title: "GameVault",
  description: "GameVault - fall to game",
  icons: {
    icon: "/Logo.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning

    >
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
