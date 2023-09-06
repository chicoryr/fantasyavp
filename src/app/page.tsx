"use client"
import ExplainModal from "@/components/ExplainModal";
import { UserAuth } from "@/context/AuthContext"

export default function Home() {
  const {user, loading} = UserAuth();
  return loading ? <>ADD LOADING SPINNER</> : (user ? <>Logged in!</> : <ExplainModal/>)
}
