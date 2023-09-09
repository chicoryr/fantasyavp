import { Dna } from "react-loader-spinner";

export default function Loader() {
  return (
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
  )
};
