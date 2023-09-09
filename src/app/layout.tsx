import { AuthContextProvider } from "@/context/AuthContext";
import Navbar from "../components/Navbar"
import "./globals.css";
import Footer from "@/components/Footer";
import { DARK_BG_1 } from "@/styles/colors";
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
      <body suppressHydrationWarning={true} className={`${DARK_BG_1}`}>
        <AuthContextProvider>
          <Navbar/>
          {children}
          <Footer/>
        </AuthContextProvider>
      </body>
    </html>
  )
}