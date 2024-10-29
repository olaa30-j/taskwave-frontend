import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export interface TaskForm {
    title: string;
    description: string;
    priority: string;
    color: string;
    // image: File;
}



const CreateTaskForm: React.FC = () => {
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        priority: Yup.string().required('Priority is required'),
        color: Yup.string().required('Color is required'),
        // image: Yup.mixed()
        // .required('Image is required')
        // .test('fileType', 'Unsupported File Format', (value) => {
        //     if (!value) return true; 
        //     const acceptedFormats = ['image/jpeg', 'image/png', 'image/gif'];
        //     return value instanceof File && acceptedFormats.includes(value.type);
        // }),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
        setValue,
    } = useForm<TaskForm>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: '',
            description: '',
            priority: '',
            // image: undefined,
            color: '#ff6c0a',
        },
    });

    const onSubmit = async (data: TaskForm) => {
        try {
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handlePrioritySelect = (level: string) => {
        setValue('priority', level);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-center gap-6">


                <div className='flex gap-4'>
                    {/* Priority Dropdown */}
                    <div className='pt-[30px]'>
                        <label htmlFor="priority-dropdown" className="block mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Priority</label>
                        <button
                            id="priority-dropdown-button"
                            type="button"
                            className="flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
                        >
                            {errors.priority?.message || 'Select Priority'}
                            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <div className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                {['Low', 'Medium', 'High'].map((level) => (
                                    <li key={level}>
                                        <button
                                            type="button"
                                            onClick={() => handlePrioritySelect(level)}
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            {level}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>


                    {/* Title Input */}
                    <div className='w-[83%]'>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                        <input
                            type="text"
                            {...register('title')}
                            className="block w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500"
                            placeholder="Task Title"
                        />
                        {errors.title && <div className="text-red-500 text-xs">{errors.title.message}</div>}
                    </div>
                </div>
                {/* Description Input */}
                <div>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                    <textarea
                        {...register('description')}
                        className="block w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500"
                        placeholder="Task Description"
                        rows={1}
                    />
                    {errors.description && <div className="text-red-500 text-xs">{errors.description.message}</div>}
                </div>

                {/* Color Picker */}
                <div>
                    <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900"></label>
                    <input
                        type="color"
                        {...register('color')}
                        className="block w-full p-2.5 border border-gray-300 w-[45px] h-[40px] rounded-md focus:ring-blue-500"
                    />
                    {errors.color && <div className="text-red-500 text-xs">{errors.color.message}</div>}
                </div>

                {/* Image Upload */}
                {/* <div>
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Upload Image</label>
                    <input
                        type="file"
                        {...register('image')}
                        className="block w-full border border-gray-300 rounded-md focus:ring-blue-500"
                    />
                    {errors.image && <div className="text-red-500 text-xs">{errors.image.message}</div>}
                </div> */}

                {/* Submit Button */}
                <button type="submit" className="mt-2 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Add Task
                </button>
            </div>
        </form>
    );
};

export default CreateTaskForm;
