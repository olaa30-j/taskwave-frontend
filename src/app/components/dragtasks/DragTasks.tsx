"use client";
import { useAppDispatch, useAppSelector } from "@/store/store";
import TaskCard, { TaskCardProp } from "./TaskCard";
import { getUsersTasks, updateStateTask } from "@/store/reducers/taskSlice";
import { useEffect } from "react";

const DragTasks = () => {
    const dispatch = useAppDispatch();
    const { tasks, loading, error } = useAppSelector((state) => state.userTasks);
    
    useEffect(() => {
        dispatch(getUsersTasks());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const onDragStart = (e: React.DragEvent, taskId: string) => {
        e.dataTransfer.setData("taskId", taskId);
    };

    const onDrop = (e: React.DragEvent, newState: string) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId");
        const task = tasks.find(task => task._id === taskId);
        if (task?.state !== newState) {
            dispatch(updateStateTask({ _id: taskId, state: newState }));
        }
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const renderTasks = (state: string) => {
        return tasks.map((task: TaskCardProp) =>
            task.state === state ? (
                <div key={task._id} draggable onDragStart={(e) => onDragStart(e, task._id)}>
                    <TaskCard
                        image={task.image}
                        title={task.title}
                        _id={task._id}
                        description={task.description}
                        state={task.state}
                        priority={task.priority}
                    />
                </div>
            ) : null
        );
    };

    return (
        <div className="flex justify-between">
            {/* Todo Column */}
            <div
                className="w-[31.2%] p-4 border border-gray-200 rounded"
                onDrop={(e) => onDrop(e, "todo")}
                onDragOver={onDragOver}
            >
                <h3 className="text-center font-semibold mb-4">Todo</h3>
                {renderTasks("todo")}
            </div>

            {/* Doing Column */}
            <div
                className="w-[31.5%] p-4 border border-gray-200 rounded"
                onDrop={(e) => onDrop(e, "doing")}
                onDragOver={onDragOver}
            >
                <h3 className="text-center font-semibold mb-4">Doing</h3>
                {renderTasks("doing")}
            </div>

            {/* Done Column */}
            <div
                className="w-[31.5%] p-4 border border-gray-200 rounded"
                onDrop={(e) => onDrop(e, "done")}
                onDragOver={onDragOver}
            >
                <h3 className="text-center font-semibold mb-4">Done</h3>
                {renderTasks("done")}
            </div>
        </div>
    );
};

export default DragTasks;
