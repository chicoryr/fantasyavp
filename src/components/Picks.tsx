"use client"
import useFetchPicks from "@/hooks/fetchPicks";
export default function Picks() {
    const {loading, picks} = useFetchPicks();
    const sumOfFinishes = picks?.reduce((sum, pick) => sum + pick.finish, 0) || undefined;

    return (
        <div className="min-h-screen py-6 flex justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    {sumOfFinishes && "Results: " + sumOfFinishes}
                    {loading ? (
                        <div className="flex justify-center items-center space-x-4">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                            <p className="text-gray-500">Loading...</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {picks?.map((pick) => (
                                <li key={pick.id} className="flex items-center space-x-2">
                                    <span className="text-gray-700 bg-gray-200 p-2 rounded-md">{pick.finish} {pick.Player1} / {pick.Player2}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
