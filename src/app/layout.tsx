import { AuthContextProvider } from "@/context/AuthContext";
import Navbar from "../components/Navbar"
import "./globals.css";
import Footer from "@/components/Footer";
import ThemeContextProvider, { useThemeContext } from "@/context/ThemeContext";
export const metadata = {
  title: 'Fantasy AVP'
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body suppressHydrationWarning={true}>
        <AuthContextProvider>
          <ThemeContextProvider>
            <Navbar/>
              {children}
            <Footer/>
          </ThemeContextProvider>
        </AuthContextProvider>
         
      </body>
      
    </html>
  )
}