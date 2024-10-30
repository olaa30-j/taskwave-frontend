"use client"; // This indicates that the component will run on the client side

import TasksTable from "@/app/components/usertasks/TasksTable";
import { getUserTasks } from "@/store/reducers/taskSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";

const UserTasksPage = () => { 
    const dispatch = useAppDispatch();
    const { userTasks, loading, error } = useAppSelector((state) => state.userTasks);

    useEffect(() => {
        dispatch(getUserTasks());
    }, [dispatch]);

    if (error) {
        return <div>Error: {error}</div>; 
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
            <TasksTable data={userTasks} isLoading={loading} />
        </div>
    );
};

export default UserTasksPage; 
