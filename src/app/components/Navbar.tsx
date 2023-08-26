import Link from "next/link";

export default function Navbar(){
    return (
        <div className="bg-gray-300 w-full border-b-2 flex items-center justify-between p-2">
            <ul className="flex p-4">
                <li className="mr-6">
                    <Link className="text-blue-500 hover:text-blue-800" href="/">Home</Link>
                </li>
                <li className="mr-6">
                    <Link className="text-blue-500 hover:text-blue-800" href="/tournaments/chicago-test">chicago-test</Link>
                </li>
            </ul>
            <Link className="text-3xl" href="/">Fantasy AVP</Link>
            <ul className="flex p-4">
                <li className="mr-6">
                    <Link className="text-blue-500 hover:text-blue-800 h-full" href="/signup">Signup</Link>
                </li>
                <li className="mr-6">
                    <Link className="text-blue-500 hover:text-blue-800 h-full" href="/about">About</Link>
                </li>
            </ul>
        </div>
    )
}