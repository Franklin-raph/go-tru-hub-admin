"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import SideNav from '../side-nav/SideNav';
import TopNav from '../top-nav/TopNav';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@/app/utils/Axios-interceptors';
import { useForm } from 'react-hook-form';
import PageLoader from '../page-loader/PageLoader';
import { IoChevronDown } from "react-icons/io5";
import BtnLoader from '../btn-Loader/BtnLoader'

const SubInfo = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const pathName = usePathname();
    const router = useRouter();
    const id = pathName.split('/')[2];

    const [selectedFeatureIds, setSelectedFeatureIds] = useState([]);
    const [featureDropDown, setFeatureDropDown] = useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['subInfo'],
        queryFn: async () => {
            const response = await api.get(`/subscriptions/${id}`);
            return response.data.data;
        },
    });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (data) {
            reset({
                name: data.name,
                amount: data.amount,
                duration: data.duration,
                planValidity: data.planValidity,
                description: data.description,
            });
            setSelectedFeatureIds(data.feature.map(f => f._id));
        }
    }, [data, reset]);

    const { data: featuresData, isLoading: featuresLoader, isError: featuresError } = useQuery({
        queryKey: ['features'],
        queryFn: async () => {
            const response = await api.get('/features');
            return response.data.data;
        },
    });

    const handleCheckboxChange = (event) => {
        const selectedId = event.target.value;

        setSelectedFeatureIds(prevIds => {
            if (event.target.checked) {
                return [...prevIds, selectedId];
            } else {
                return prevIds.filter(id => id !== selectedId);
            }
        });
    };

    const updateSub = async (values) => {
        setLoading(true)
        const res = await api.put(`/subscriptions/${id}`, { ...values, features: selectedFeatureIds });
        if(res) setLoading(false);
        if (res.data) {
            alert("Plan successfully updated")
        }
    };
    
    const handleDelete = async () => {
        setLoading(true)
        const res = await api.delete(`/subscriptions/${id}`);
        if(res) setLoading(false);
        if (res.data) {
            router.replace('/subscription');
        }
    }

    if (isLoading) return <PageLoader />;
    if (isError) return <div>Sorry, there was an error loading the subscription data.</div>;

    return (
        <div>
            <>
                <SideNav />
                <div className="w-[78%] ml-auto h-[100dvh]">
                    <TopNav />
                    <div className="px-[30px] py-[1rem]">
                        <div className="flex items-center justify-between mb-[3rem]">
                            <div>
                                <p className="text-[28px] text-primary-color font-[600]">Subscription Plan</p>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(updateSub)} className="max-w-xl mx-auto p-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Plan name</label>
                            <input
                                {...register('name', { required: true })}
                                type="text"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.name && <span className='text-red-500 block text-[12px]'>This field is required</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Amount</label>
                            <input
                                {...register('amount', { required: true })}
                                type="number"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.amount && <span className='text-red-500 block text-[12px]'>This field is required</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Duration</label>
                            <input
                                {...register('duration', { required: true })}
                                type="text"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.duration && <span className='text-red-500 block text-[12px]'>This field is required</span>}
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-sm font-medium text-gray-700">Feature(s)</label>
                            <div className='flex items-center justify-between w-full py-[6px] px-[6px] border rounded-[6px] mt-1'>
                                <p>{selectedFeatureIds.map(id => featuresData?.find(f => f._id === id)?.name).join(', ')}</p>
                                <IoChevronDown onClick={() => setFeatureDropDown(!featureDropDown)} cursor={'pointer'} />
                            </div>
                            {featureDropDown && (
                                <div className='w-full py-1 px-[6px] border rounded-[6px] mt-1 absolute bg-white z-10'>
                                    {featuresData?.map((feature) => (
                                        <div key={feature._id} className="relative py-2 pl-3 pr-9">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    value={feature._id}
                                                    onChange={handleCheckboxChange}
                                                    checked={selectedFeatureIds.includes(feature._id)}
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                />
                                                <label className="ml-3 block text-sm font-medium text-gray-700">
                                                    {feature.name}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Plan Validity</label>
                            <input
                                {...register('planValidity', { required: true })}
                                type="number"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.planValidity && <span className='text-red-500 block text-[12px]'>This field is required</span>}
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
                        {
                            loading ? 
                            <BtnLoader />
                            :
                            <div className='flex items-center gap-5'>
                                <button className="px-4 py-2 bg-gray-800 text-white rounded-md w-full" type="submit">Update Plan</button>
                                <button className="px-4 py-2 bg-red-800 text-white rounded-md w-full" type="button" onClick={handleDelete}>Delete Plan</button>
                            </div>
                            
                        }
                    </form>
                </div>
            </>
        </div>
    );
};

export default SubInfo;
