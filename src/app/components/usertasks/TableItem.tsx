"use client";

import { deleteTask, Task } from "@/store/reducers/taskSlice";
import { useAppDispatch } from "@/store/store";
import Image from "next/image";
import React, { useState } from "react";
import Swal from "sweetalert2";
import EditTaskForm from "../editTask.tsx/EditTaskForm";

const TableItem = ({ task }: { task: Task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const dispatch = useAppDispatch();

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>, _id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(_id)).then(() => {
          Swal.fire(
            'Deleted!',
            'Your task has been deleted.',
            'success'
          );
        }).catch(error => {
          // Handle any error if needed
          Swal.fire(
            'Error!',
            error.message || 'Failed to delete the task.',
            'error'
          );
        });
      }
    });
  }



  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <Image
            className="w-10 h-10 rounded-full"
            height={400}
            width={400}
            src={`${task.image}`}
            alt={task.title}
          />
          <div className="ps-3">
            <div className="text-base font-semibold">{task.title}</div>
          </div>
        </th>
        <td className="px-6 py-4">{task.description}</td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <div
              className={`h-2.5 w-2.5 rounded-full me-2 
                ${task.priority === "Low" ? `bg-[#1c536c]` : ``} 
                ${task.priority === "Medium" ? `bg-[#f4ecac]` : ``} 
                ${task.priority === "High" ? `bg-[#34b4ec]` : ``}`}
            ></div>
            {task.priority}
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <div className={`h-2.5 w-2.5 rounded-full me-2
            ${task.state === "todo" ? `bg-red-500` : ``} 
            ${task.state === "doing" ? `bg-yellow-500` : ``} 
            ${task.state === "done" ? `bg-green-500` : ``}
            `}></div>
            {task.state}
          </div>
        </td>

        <td className="px-6 py-4">
          <div className="flex items-center text-green-600" onClick={toggleModal}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </div>
        </td>

        <td className="px-6 py-4">
          <div className="flex items-center text-red-600" onClick={(e) => handleDelete(e, task._id)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </div>
        </td>
      </tr>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-y-auto">
          <div className="max-h-screen max-w-full w-full sm:w-auto py-4 px-4 overflow-y-auto bg-white rounded-lg">
            <EditTaskForm
              _id={task?._id}
              image={task.image}
              title={task.title}
              description={task.description}
              priority={task.priority}
            />
            <button onClick={toggleModal} className="absolute top-0 right-0 m-4 text-white">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TableItem;
