"use client"
import DragTasks from '@/app/components/dragtasks/DragTasks'
import CreateTaskForm from '@/app/components/taskform/CreateTask'

const page = () => {
  return (
    <>
      <div className="p-4 my-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <CreateTaskForm />
      </div>
      <div className='my-4 py-2'>
        <DragTasks />
      </div>
    </>
  )
}

export default page