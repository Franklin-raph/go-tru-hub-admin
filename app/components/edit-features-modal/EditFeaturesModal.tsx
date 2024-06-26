"use client"

import React, { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import BtnLoader from '../btn-Loader/BtnLoader'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/app/utils/Axios-interceptors'
import { IoChevronDown } from "react-icons/io5";

const EditFeaturesModal = ({ setEditFeaturesModal, eidtFeatureModal } : any) => {

  const featuresArray = [
    "Gotru Trade", "Gotru Monitor", "Gotru Pass"
  ]
  
  const [featureDropDown, setFeatureDropDown] = useState<boolean>(false)

  const {
      register, 
      handleSubmit, 
      formState: { errors, isSubmitting },
      reset,
  } = useForm()

  const queryClient = useQueryClient()

  const mutation = useMutation({
      
      mutationFn: async (values: any) => {
          console.log();
          const { data } = await api.put(`/features/${eidtFeatureModal._id}`, { name: values.name });
          return data;
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['features'] });
          reset();
          setEditFeaturesModal(false);
      },
      onError: (error) => {
          console.error('Error creating feature:', error);
      },
  });

  const createFeature = async (values: any) => {
      mutation.mutate(values);
  };


  return (
    <div>
        <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setEditFeaturesModal(false)}></div>
        <div className="bg-white w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
            <div className="flex items-center justify-between border-b pb-[5px]">
                <p className="text-[px]">Edit Feature</p>
                <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setEditFeaturesModal(false)}/>
            </div>
            <form onSubmit={handleSubmit(createFeature)} className='flex flex-col'>
                <div className='mt-5 relative'>
                    <label className="block text-sm font-medium text-gray-700">Feature(s)</label>
                    <div className='flex items-center justify-between border border-gray-300 w-full mt-2 px-2 py-2 rounded'>
                        <input
                            type="text"
                            {...register('name')}
                            className='outline-none'
                            placeholder={`${eidtFeatureModal.name}`}
                        />
                        <IoChevronDown fontSize={"20px"} cursor={"pointer"} onClick={() => setFeatureDropDown(!featureDropDown)}/>
                    </div>
                    {
                        featureDropDown &&
                        <div className='absolute top-[85px] bg-white w-full border border-gray-300 rounded'>
                            {
                                featuresArray.map((feature, index) => {
                                    return(
                                        <p key={index} className='py-2 cursor-pointer hover:bg-gray-200 px-3' onClick={() => {
                                            setFeatureDropDown(false)
                                            reset({ name: feature })
                                        }}>{feature}</p>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
                {
                    mutation.isPending ?
                    <BtnLoader />
                    :
                    <button type='submit' disabled={isSubmitting} className='mt-5 bg-secondary-color w-full text-white py-[8px] rounded'>Update Feature</button>
                }
                {mutation.isError && <p className='text-red-500 text-[14px] text-left mt-1'>Error creating feature</p>}
            </form>
        </div>
    </div>
  )
}

export default EditFeaturesModal