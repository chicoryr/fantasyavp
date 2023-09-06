import { AuthContextProvider } from "@/context/AuthContext";
import Navbar from "../components/Navbar"
import "./globals.css";
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
          <Navbar/>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}