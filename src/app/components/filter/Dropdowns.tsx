"use client"

import { setFilters } from '@/store/reducers/taskSlice';
import { useAppDispatch } from '@/store/store';
import React, { useState } from 'react';

const FilterDropdowns: React.FC = () => {
    const dispatch = useAppDispatch();
    
    const [state, setState] = useState<string>('');
    const [priority, setPriority] = useState<string>('');
    const [stateDropdownOpen, setStateDropdownOpen] = useState<boolean>(false);
    const [priorityDropdownOpen, setPriorityDropdownOpen] = useState<boolean>(false);

    const handleStateChange = (newState: string) => {
        setState(newState);
        dispatch(setFilters({ state: newState })); 
        setStateDropdownOpen(false); 
    };

    const handlePriorityChange = (newPriority: string) => {
        setPriority(newPriority);
        dispatch(setFilters({ priority: newPriority })); 
        setPriorityDropdownOpen(false); 
    };

    return (
        <div className="flex gap-4">
            {/* State Dropdown */}
            <div>
                <button
                    id="stateDropdownButton"
                    onClick={() => setStateDropdownOpen((prev) => !prev)} 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none w-40 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                    type="button"
                >
                    {state || 'Select State'} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                {stateDropdownOpen && ( 
                    <div id="stateDropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-40">
                        <ul className="py-2 text-sm text-gray-700" aria-labelledby="stateDropdownButton">
                            <li>
                                <a href="#" onClick={() => handleStateChange('done')} className="block px-4 py-2 hover:bg-gray-100">Done</a>
                            </li>
                            <li>
                                <a href="#" onClick={() => handleStateChange('todo')} className="block px-4 py-2 hover:bg-gray-100">Todo</a>
                            </li>
                            <li>
                                <a href="#" onClick={() => handleStateChange('doing')} className="block px-4 py-2 hover:bg-gray-100">Doing</a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Priority Dropdown */}
            <div>
                <button
                    id="priorityDropdownButton"
                    onClick={() => setPriorityDropdownOpen((prev) => !prev)}
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium w-40 rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                    type="button"
                >
                    {priority || 'Select Priority'} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                {priorityDropdownOpen && (
                    <div id="priorityDropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-40">
                        <ul className="py-2 text-sm text-gray-700" aria-labelledby="priorityDropdownButton">
                            <li>
                                <a href="#" onClick={() => handlePriorityChange('High')} className="block px-4 py-2 hover:bg-gray-100">High</a>
                            </li>
                            <li>
                                <a href="#" onClick={() => handlePriorityChange('Medium')} className="block px-4 py-2 hover:bg-gray-100">Medium</a>
                            </li>
                            <li>
                                <a href="#" onClick={() => handlePriorityChange('Low')} className="block px-4 py-2 hover:bg-gray-100">Low</a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterDropdowns;
