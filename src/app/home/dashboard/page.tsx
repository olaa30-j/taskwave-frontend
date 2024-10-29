"use client"
import CreateTaskForm from '@/app/components/taskform/CreateTask'

const page = () => {
  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <CreateTaskForm/>
    </div>
  )
}

export default page