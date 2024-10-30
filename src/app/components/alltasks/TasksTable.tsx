"use client";
import React from "react";
import TableItem from "./TableItem";
import { Task } from "@/store/reducers/taskSlice";

interface TasksTableProps{
  data: Task[];
  isLoading: boolean;
}

const TasksTable: React.FC<TasksTableProps> = ({ data, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <>
          <div className="flex items-center justify-center w-full">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        </>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                description
              </th>
              <th scope="col" className="px-6 py-3">
                Priority
              </th>
              <th scope="col" className="px-6 py-3">
                State
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((task, index) => (
              <TableItem key={index} task={task} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default TasksTable
