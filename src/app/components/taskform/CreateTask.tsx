/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createnewTask } from '@/store/reducers/taskSlice';
import { useAppDispatch } from '@/store/store';

export interface TaskData {
  image: File;
  title: string;
  description: string;
  priority: string;
}


const CreateTaskForm: React.FC = () => {
  const [fileData, setFileData] = useState<File | undefined>(undefined);
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().min(5, "min text is 5 characters").required('Description is required'),
    priority: Yup.string().required('Priority is required'),
    image: Yup.mixed<File>().required('Image is required')
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<TaskData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: '',
      image: undefined,
    },
  });

  const image = watch('image');

  const onSubmit = async (data: TaskData) => {

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('priority', data.priority);
    if (fileData && fileData instanceof File) {
      formData.append('image', fileData);
    } else {
      console.log("Image is missing or not a valid file.");
    }
    try {
      await dispatch(createnewTask({ formData }));
    } catch (error: any) {
      console.error("Task creation error:", error.response?.data?.message || "Task creation failed");
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center gap-6">

        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
          <input
            type="text"
            {...register('title')}
            className="block w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500"
            placeholder="Task Title"
          />
          {errors.title && <div className="text-red-500 text-xs">{errors.title.message}</div>}
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
          <textarea
            {...register('description')}
            className="block w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500"
            placeholder="Task Description"
            rows={3}
          />
          {errors.description && <div className="text-red-500 text-xs">{errors.description.message}</div>}
        </div>

        {/* Priority Input */}
        <div>
          <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900">Priority</label>
          <select
            {...register('priority')}
            className="block w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500"
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.priority && <div className="text-red-500 text-xs">{errors.priority.message}</div>}
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Upload Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register('image')}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event.target.files && event.target.files.length > 0) {
                const file = event.target.files[0] as File;
                setValue('image', file);
                setFileData(file)
              }
            }}
            className="block w-full border border-gray-300 rounded-md focus:ring-blue-500"
          />
          {errors.image && <div className="text-red-500 text-xs">{errors.image.message}</div>}

          {/* Display Image Preview */}
          {image && image instanceof File && (
            <div className="mt-4">
              <p className="text-sm text-gray-700">Selected Image:</p>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md border"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="mt-2 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
