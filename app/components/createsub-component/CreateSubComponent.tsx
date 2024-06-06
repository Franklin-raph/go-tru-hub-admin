"use client"

import React, { useState } from 'react'
import SideNav from '../side-nav/SideNav'
import TopNav from '../top-nav/TopNav'
import api from '@/app/utils/Axios-interceptors'
import { useQuery } from '@tanstack/react-query'

// Define the type for the feature
type FeatureType = {
    id: number;
    name: string;
    // Add other properties if needed
};

const CreateSubComponent = () => {

    // const [allFeatures, setAllFeatures] = useState([])

    const getAllFeatures = async () => {
        const { data } = await api.get('/features')
        console.log(data.data);
        return data.data
    }

    const { data, isLoading: featuresLoading, isError: featuresError } = useQuery({
        queryKey: ['features'],
        queryFn: getAllFeatures,
    });

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
                            {/* <p className='text-[#828282]'>Your current pricing system is set to,</p> */}
                        </div>
                        <div className="flex items-center gap-3">
                            {/* <button  className="py-3 px-4 bg-[#FFFFFF] rounded-[8px] text-[14px] font-[600] shadow-md" onClick={() => router.replace('/subscription')} >Contract plan</button>
                            <button className="bg-[#2D3934] text-white px-4 py-3 rounded-[8px] font-[600] text-[14px]" onClick={() => router.replace('/create-sub')}>Create Plan</button> */}
                        </div>
                    </div>
                </div>
                <form className="max-w-xl mx-auto p-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Plan name</label>
                        <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Feature(s)</label>
                        <select
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            {
                                data?.map((feature: FeatureType, index: number) => (
                                    <option key={index} value={feature.name}>{feature.name}</option>
                                ))
                            }
                        {/* <option value="GotruPass">GotruPass</option> */}
                        {/* Add more options as needed */}
                        </select>
                    </div>

                    <div className="mb-4 flex space-x-4">
                        <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                        <select
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="Monthly">Monthly</option>
                            {/* Add more options as needed */}
                        </select>
                        </div>

                        <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Plan validity</label>
                        <div className="flex space-x-2">
                            <input
                            type="number"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="Days">Days</option>
                            {/* Add more options as needed */}
                            </select>
                        </div>
                        </div>
                    </div>

                    <div className="mb-4 flex space-x-4 items-center">
                        <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Amount</label>
                        <input
                            type="number"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        </div>
                        <div className="text-xl mt-6">₦</div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description (120 characters)</label>
                        <textarea
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        maxLength={120}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                        type="submit"
                        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        Create plan
                        </button>
                    </div>
                </form>
            </div>
        </>
    </div>
  )
}

export default CreateSubComponent