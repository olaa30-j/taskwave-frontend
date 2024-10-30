"use client";
import React, { ChangeEvent, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppDispatch } from '@/store/store';
import { updateTask } from '@/store/reducers/taskSlice';

export interface TaskData {
  _id?: string;
  image: File | string;
  title: string;
  description: string;
  priority: string;
}

const EditTaskForm: React.FC<TaskData> = ({ _id, image, title, description, priority }) => {
  const [fileData, setFileData] = useState<File | undefined>();
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().min(3, "Description must be at least 3 characters").required('Description is required'),
    priority: Yup.string().required('Priority is required'),
    image: Yup.mixed<File | string>().required('Image is required'),
  });

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<TaskData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: title,
      description: description,
      priority: priority,
      image: typeof image === 'string' ? image : undefined,
    },
  });

  useEffect(() => {
    if (image && typeof image === 'string') {
      setValue('image', image);
    }
  }, [image, setValue]);

  const onSubmit = async (data: TaskData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('priority', data.priority);

    if (fileData) {
      formData.append('image', fileData);
    }

    try {
      await dispatch(updateTask({ _id: _id, formData }));
      console.log("update it successful");
    } catch (error: any) {
      console.error("Task update error:", error.response?.data?.message || "Task update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-[#fff] w-[60vw] p-6 rounded-md'>
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
                setFileData(file);
              } else {
                setFileData(undefined)
              }
            }}
  
            className="block w-full border border-gray-300 rounded-md focus:ring-blue-500"
          />
          {errors.image && <div className="text-red-500 text-xs">{errors.image.message}</div>}

          {/* Display Image Preview */}
          <div className="mt-4">
            <p className="text-sm text-gray-700">{fileData ? "Selected Image:" : "Current Image:"}</p>
            <img
              src={fileData ? URL.createObjectURL(fileData) : (typeof image === 'string' ? image : '')}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-md border"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="mt-2 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          Update Task
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
