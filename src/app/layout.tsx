import { AuthContextProvider } from "@/context/AuthContext";
import Navbar from "../components/Navbar"
import "./globals.css";
import Footer from "@/components/Footer";
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
      <body suppressHydrationWarning={true} className="bg-black">
        <AuthContextProvider>
          <Navbar/>
          {children}
          <Footer/>
        </AuthContextProvider>
      </body>
    </html>
  )
}