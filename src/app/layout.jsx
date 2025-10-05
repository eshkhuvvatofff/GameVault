import LayoutWrapper from "@/components/layout/LayoutWrapper";
import "./globals.css";

export const metadata = {
  title: "Example Name",
  description: "Example Desc",
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
