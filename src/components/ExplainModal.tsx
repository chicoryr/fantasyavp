import { useThemeContext } from "@/context/ThemeContext"


export default function ExplainModal() {
  const {theme} = useThemeContext();
  return (
      <div className={`min-h-screen flex flex-col items-center ${theme == 'light' ? 'bg-white' : 'bg-black'}`}>
        <div className={`w-full max-w-xl p-8 rounded-xl shadow-md text-center space-y-4 mt-20 `}>
          <h1 className="text-2xl font-bold mb-4">Welcome to Fantasy AVP!</h1>
          
          <p>Here are the rules:</p>
          <ul className="list-decimal list-inside text-left space-y-2 pl-5">
            <li>You have $1,000,000 to spend.</li>
            <li>You must pick 4 teams of each gender, no more, no less.</li>
            <li>You score based on how your picked teams finish.</li>
          </ul>
          <div>Sign in then click on Chicago in the top right to get started!</div>
          <div className="text-xs">Email me at chicoryroth@gmail.com with any questions/bugs/requests</div>
        </div>
      </div>
    )
};
