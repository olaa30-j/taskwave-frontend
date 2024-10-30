"use client"

import TasksTable from "@/app/components/alltasks/TasksTable";
import Dropdowns from "@/app/components/filter/Dropdowns";
import { getUsersTasks, setFilters } from "@/store/reducers/taskSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";

const page = () => {
    const dispatch = useAppDispatch();
    const { tasks, loading, error } = useAppSelector((state) => state.userTasks);
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilters({ title: e.target.value }));
    };

    useEffect(() => {
        dispatch(getUsersTasks());
    }, [dispatch]);
    return (
        <>
            <div className="relative">
                <div className="flex justify-between my-8">
                    <input
                        type="text"
                        placeholder="Search by Title"
                        onChange={handleTitleChange}
                        className="block w-[50%] p-4 ps-10 text-sm text-gray-900 max-h-[50px] border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />

                    <Dropdowns />
                </div>

            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
                <TasksTable data={tasks} isLoading={loading} />
            </div>
        </>

    )
}
export default page;
