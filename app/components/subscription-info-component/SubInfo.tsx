"use client"

import { usePathname, useRouter } from 'next/navigation'
import SideNav from '../side-nav/SideNav'
import TopNav from '../top-nav/TopNav'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '@/app/utils/Axios-interceptors'
import { useForm } from 'react-hook-form'
import PageLoader from '../page-loader/PageLoader'
import { ChangeEvent, useState } from 'react'
import { IoChevronDown } from "react-icons/io5";


type FeatureType = {
    _id: number;
    name: string;
};

const SubInfo = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm()

    const pathName = usePathname()
    const router = useRouter()
    let id = pathName.split('/')

    const [features, setFeatures] = useState<string[]>([]);
    const [featureDropDown, setFeatureDropDown] = useState<boolean>(false)
    const [feature, setFeature] = useState<string>('')
    const queryClient = useQueryClient();
    

    const { data, isLoading, isError } = useQuery({
        queryKey: ['subInfo'],
        queryFn: async () => {
            const { data } = await api.get(`/subscriptions/${id[2]}`)
            console.log(data.data);
            setFeature(data.data.feature[0].name)
            return data.data
        }
    })


    const getAllFeatures = async () => {
        const { data } = await api.get('/features')
        return data.data
    }

    const { data: featuresData, isLoading: featuresLoader, isError: featuresError } = useQuery({
        queryKey: ['features'],
        queryFn: getAllFeatures,
    });

    const deleteFeature = async (): Promise<void> => {
      await api.delete(`/subscriptions/${id[2]}`);
    };
  
    const mutation = useMutation({
      mutationFn: deleteFeature,
        onSuccess: () => {
            router.replace('/subscriptions')
      },
      onError: (error) => {
            console.error('Error deleting feature:', error);
      },
    });
  
    const handleDelete = () => {
      mutation.mutate();
    };


    const handleSelectChange = (value: any) => {
        setFeatureDropDown(false)
        setFeature(value?.name)
        if (!features.includes(value._id)) {
            setFeatures([...features, value._id]);
        }
    };

    const updateSub = async (values: any) => {
        // mutation.mutate(values);
        const res = await api.put(`/subscriptions/${id[2]}`, {...values, features});
        if(res.data){
            router.replace('/subscription')
        }
    }

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
                            value={data?.name}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.name && <span className='text-red-500 block text-[12px]'>This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Amount</label>
                        <input
                            {...register('amount', { required: true })}
                            type="number"
                            value={data?.amount?.$numberDecimal}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.amount && <span className='text-red-500 block text-[12px]'>This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                        <input
                            {...register('duration', { required: true })}
                            type="text"
                            value={data?.duration}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.duration && <span className='text-red-500 block text-[12px]'>This field is required</span>}
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium text-gray-700">Feature(s)</label>
                        <div className='flex items-center justify-between w-full py-[6px] px-[6px] border rounded-[6px] mt-1'>
                            <p>{feature}</p>
                            <IoChevronDown onClick={() => setFeatureDropDown(!featureDropDown)} cursor={'pointer'}/>
                        </div>
                        {
                            featureDropDown &&
                            <div className='w-full py-1 px-[6px] border rounded-[6px] mt-1 absolute bg-white'>
                                {featuresData?.map((feature: FeatureType, index: number) => (
                                    <p key={feature._id} className='cursor-pointer' onClick={() =>  {
                                        handleSelectChange(feature)
                                    }}>
                                        {feature.name}
                                    </p>
                                ))}
                            </div>
                        }
                        {/* <select onChange={handleSelectChange} value={"hello"} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            {featuresData?.map((feature: FeatureType, index: number) => (
                            <option key={feature._id} value={feature._id}>
                                {feature.name}
                            </option>
                            ))}
                        </select> */}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Plan Validity</label>
                        <input
                            {...register('planValidity', { required: true })}
                            type="number"
                            value={data?.planValidity}
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
                        value={data?.description}
                        />
                        {errors.description && <span className='text-red-500 block text-[12px]'>This field is required</span>}
                    </div>
                    <div className='flex items-center gap-5'>
                        <button className="px-4 py-2 bg-gray-800 text-white rounded-md w-full">Update</button>
                        <button className="px-4 py-2 bg-red-800 text-white rounded-md w-full" onClick={() => handleDelete()} >Delete</button>
                    </div>
                </form>
            </div>
        </>
        {/* {
            eidtFeatureModal &&
            <EditFeaturesModal setEditFeaturesModal={setEditFeaturesModal} eidtFeatureModal={eidtFeatureModal}/>
        }

        {
            createFeatureModal &&
            <CreateFeatureModal setCreateFeaturesModal={setCreateFeaturesModal} />
        }

        {
            deleteFeatureModal &&
            <DeleteFeaturesModal setDeleteFeaturesModal={setDeleteFeaturesModal} deleteFeatureModal={deleteFeatureModal} />
        } */}
    </div>
  )
}

export default SubInfo