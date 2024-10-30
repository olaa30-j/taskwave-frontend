"use client"
import TasksTable from "@/app/components/usertasks/TasksTable";
import { getUserTasks } from "@/store/reducers/taskSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";

const page = () => {
    const dispatch = useAppDispatch();
    const { userTasks, loading, error } = useAppSelector((state) => state.userTasks);

    useEffect(() => {
        dispatch(getUserTasks());
    }, [dispatch]);
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
            <TasksTable data={userTasks} isLoading={loading}/>
        </div>
    )
}
export default page;
