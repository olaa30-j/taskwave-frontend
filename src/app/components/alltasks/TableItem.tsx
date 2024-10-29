import { TaskData } from "@/app/_lib/task";
import Image from "next/image";
import React from "react";
export default function TableItem({ task }: { task: TaskData }) {
  return (
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
                ${task.priority == "Low" ? `bg-green-500` : ``} 
                ${task.priority == "Medium" ? `bg-yellow-500` : ``} 
                ${task.priority == "High" ? `bg-red-500` : ``}`}
          ></div>
          {task.priority}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className={`h-2.5 w-2.5 rounded-full me-2
            ${task.state == "todo" ? `bg-red-500` : ``} 
            ${task.state == "doing" ? `bg-blue-500` : ``} 
            ${task.state == "done" ? `bg-green-500` : ``}
            `}></div>
          {task.state}
        </div>
      </td>
    </tr>
  );
}
