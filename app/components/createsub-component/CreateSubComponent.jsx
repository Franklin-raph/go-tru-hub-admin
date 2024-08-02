"use client"

import React, { useState, ChangeEvent, useEffect, useRef } from 'react'
import SideNav from '../side-nav/SideNav'
import TopNav from '../top-nav/TopNav'
import api from '@/app/utils/Axios-interceptors'
import { useMutation, useQuery } from '@tanstack/react-query'
import PageLoader from '../page-loader/PageLoader'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import BtnLoader from '../btn-Loader/BtnLoader'

const CreateSubComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm()

    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const router = useRouter();
    const dropdownRef = useRef(null);

    const handleCheckboxChange = (event) => {
        const selectedId = event.target.value;
        const selectedName = event.target.name;

        if (event.target.checked) {
            setSelectedFeatures([...selectedFeatures, { id: selectedId, name: selectedName }]);
        } else {
            setSelectedFeatures(selectedFeatures.filter(feature => feature.id !== selectedId));
        }
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const getAllFeatures = async () => {
        const { data } = await api.get('/features')
        return data.data
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['features'],
        queryFn: getAllFeatures,
    });

    const mutation = useMutation({
        mutationFn: async (values) => {
            const { data } = await api.post('/subscriptions', { ...values, features: selectedFeatures.map(f => f.id) });
            console.log(data);
            return data;
        },
        onSuccess: () => {
            router.replace('/subscription')
        },
        onError: (error) => {
            console.error('Error creating subscription plan:', error);
        },
    })

    const createSubPlan = async (values) => {
        console.log(values);
        mutation.mutate(values);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [dropdownRef]);

    if (isLoading) return <PageLoader />;
    if (isError) return <div>Sorry There was an Error</div>

    return (
        <div>
            <>
                <SideNav />
                <div className="w-[78%] ml-auto h-[100dvh]">
                    <TopNav />
                    <div className="px-[30px] py-[1rem]">
                        <div className="flex items-center justify-between mb-[3rem]">
                            <div>
                                <p className="text-[28px] text-primary-color font-[600]">Create Plan</p>
                            </div>
                            <div className="flex items-center gap-3">
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(createSubPlan)} className="max-w-xl mx-auto p-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Plan name</label>
                            <input
                                {...register('name', { required: true })}
                                type="text"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.name && <span className='text-red-500 block text-[12px]'>This field is required</span>}
                        </div>

                        <div className="mb-4 relative">
                            <label className="block text-sm font-medium text-gray-700">Feature(s)</label>
                            <div 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
                                onClick={handleDropdownToggle}
                            >
                                {selectedFeatures.map(feature => feature.name).join(', ') || 'Select features'}
                            </div>
                            {isDropdownOpen && (
                                <div ref={dropdownRef} className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
                                    <ul className="max-h-60 overflow-auto rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {data?.map((feature) => (
                                            <li key={feature._id} className="relative py-2 pl-3 pr-9">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        value={feature._id}
                                                        name={feature.name}
                                                        onChange={handleCheckboxChange}
                                                        checked={selectedFeatures.some(f => f.id === feature._id)}
                                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                    />
                                                    <label className="ml-3 block text-sm font-medium text-gray-700">
                                                        {feature.name}
                                                    </label>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="mb-4 flex space-x-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Duration</label>
                                <select
                                    {...register('duration', { required: true })}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="14-weeks">14 weeks</option>
                                </select>
                                {errors.duration && <span className='text-red-500 block text-[12px]'>This field is required</span>}
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Plan validity</label>
                                <div className="flex space-x-2">
                                    <input
                                        type="number"
                                        {...register('planValidity', { required: true })}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {errors.planValidity && <span className='text-red-500 block text-[12px]'>This field is required</span>}
                            </div>
                        </div>

                        <div className="mb-4 flex space-x-4 items-center">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Amount</label>
                                <input
                                    type="number"
                                    {...register('amount', { required: true })}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {errors.amount && <span className='text-red-500 block text-[12px]'>This field is required</span>}
                            </div>
                            <div className="text-xl mt-6">₦</div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description (120 characters)</label>
                            <textarea
                                {...register('description', { required: true })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                maxLength={120}
                            />
                            {errors.description && <span className='text-red-500 block text-[12px]'>This field is required</span>}
                        </div>

                        <div className="flex justify-end">
                            {
                                mutation.isLoading ?
                                    <BtnLoader />
                                    :
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Create plan
                                    </button>
                            }
                        </div>
                    </form>
                </div>
            </>
        </div>
    )
}

export default CreateSubComponent
