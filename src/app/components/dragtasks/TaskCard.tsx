import Image from "next/image";
import React from "react";

export interface TaskCardProp {
    image: string ;
    title: string;
    description: string;
    _id: string;
    state: string;
    priority: string;
}

const TaskCard: React.FC<TaskCardProp> = ({ image, title, description, priority }) => {
    const priorityColors: { [key: string]: string } = {
        High: "bg-[#34b4ec]",
        Medium: "bg-[#f4ecac]",
        Low: "bg-[#1c536c]"
    };

    const backgroundColor = priorityColors[priority] || "bg-white";

    return (
        <div className={`relative px-2 flex w-full my-6 shadow-sm border border-slate-200 rounded-lg w-96 min-h-[150px] ${backgroundColor}`}>
            <div className="relative p-2.5 md:w-[30%] shrink-0 overflow-hidden">
                <a href={image}>
                    <Image
                        src={image}
                        alt="card-image"
                        width={100}
                        height={100}
                        className="h-full w-full rounded-md md:rounded-lg object-cover"
                    />
                </a>
            </div>
            <div className="p-4">
                <h4 className="mb-2 text-gray-800 text-lg font-semibold">
                    {title}
                </h4>
                <p className="mb-4 border border-transparent text-md text-white transition-all">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default TaskCard;
