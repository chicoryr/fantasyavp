"use client"
import ExplainModal from "@/components/ExplainModal";
import { UserAuth } from "@/context/AuthContext"
import { Dna } from "react-loader-spinner";

export default function Home() {
  const {user, loading} = UserAuth();
  return loading ? 
  <div className="grid h-screen place-items-center">
      <Dna
      visible={true}
      height="200"
      width="200"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  </div> 
: (user ? <div className="grid h-screen place-items-center">Logged in as {user.displayName}</div> : <ExplainModal/>)
}
