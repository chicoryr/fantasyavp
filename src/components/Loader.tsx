import { useThemeContext } from "@/context/ThemeContext";
import { Dna } from "react-loader-spinner";

export default function Loader() {
  const {theme} = useThemeContext()
  return (
    <div className={`grid h-screen place-items-center ${theme == 'dark' ? "bg-black" : ""}`}>
      <Dna
      visible={true}
      height="200"
      width="200"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  </div> 
  )
};
