import { Team } from "../../types/types";

interface TeamDisplayProps {
    Team: Team;
    seed: number;
    price?: number;
    selected: boolean;
    canSelect: boolean;
    onClick?: () => void;
}

export default function TeamRow(props: TeamDisplayProps) {
    const isStrikethrough = !props.canSelect && !props.selected;
    const buttonClasses = props.canSelect || props.selected ? "bg-blue-500 text-white" : "bg-gray-400 text-white cursor-not-allowed";
    const bgColor = props.selected ? "bg-blue-200" : (props.canSelect ? "bg-green-200" : "bg-red-200");
    
    return (
        <div className={`border-2 rounded-lg flex justify-between items-center w-2/3 mx-auto ${bgColor}`}>
            <span>
                {props.seed}. {props.Team.Player1} / {props.Team.Player2}
            </span>
            <div className="flex items-center">
                <span>${Math.round(props.price || 0).toLocaleString()}</span>
                <button 
                    onClick={props.onClick} 
                    className={`px-2 py-1 rounded w-24 ml-2 w-32 ${buttonClasses} ${isStrikethrough ? "line-through" : ""}`}
                    disabled={!props.canSelect && !props.selected}>
                    {props.selected ? "Deselect" : "Select"}
                </button>
            </div>
        </div>
    );
}

