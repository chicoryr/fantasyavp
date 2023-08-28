import { Team } from "../../types/types";

interface TeamDisplayProps {
    Team: Team;
    price?: number;
    selected: boolean;
    canSelect: boolean;
    onClick?: () => void;
    gender: 'Male' | 'Female';
}

export default function TeamRow(props: TeamDisplayProps) {
    const isStrikethrough = !props.canSelect && !props.selected;
    const buttonClasses = props.canSelect ? "bg-blue-500 text-white" : "bg-gray-400 text-white cursor-not-allowed";
    const bgColor = props.selected ? "bg-blue-200" : (props.canSelect ? "bg-green-200" : "bg-red-200");
    if(props.gender != props.Team.gender){
        return (<></>)
    }
    return (
        <div className={`border-2 p-0 rounded-lg flex flex-col md:flex-row justify-between items-center w-full md:w-2/3 mx-auto my-1 md:my-2 ${bgColor}`}>
            <span className={` mx-2 md:mb-0`}>
                {props.Team.Player1} / {props.Team.Player2}
            </span>
            <div className="flex items-center">
                <span className="mr-2">${Math.round(props.price || 0).toLocaleString()}</span>
                <button 
                    onClick={props.onClick}
                    className={`text-xs md:text-base px-2 py-1 rounded w-full md:w-auto ml-2 ${buttonClasses} ${isStrikethrough ? "line-through" : ""}`}
                    disabled={!props.selected && !props.canSelect}>
                    {props.selected ? "Deselect" : "Select"}
                </button>
            </div>
        </div>
    );
}

