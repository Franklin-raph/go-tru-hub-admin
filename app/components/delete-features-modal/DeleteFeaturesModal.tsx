"use client"

import api from '@/app/utils/Axios-interceptors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import BtnLoader from '../btn-Loader/BtnLoader';

const DeleteFeaturesModal = ({ setDeleteFeaturesModal, deleteFeatureModal } : any ) => {

  const queryClient = useQueryClient();

  const deleteFeature = async (): Promise<void> => {
    await api.delete(`/features/${deleteFeatureModal._id}`);
  };

  const mutation = useMutation({
    mutationFn: deleteFeature,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['features'] });
        setDeleteFeaturesModal(false);
    },
    onError: (error) => {
      console.error('Error deleting feature:', error);
    },
  });

  const handleDelete = () => {
    mutation.mutate(deleteFeatureModal.id);
  };

  return (
    <div>
        <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeleteFeaturesModal(false)}></div>
        <div className="bg-white w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
            <div className="flex items-center justify-between border-b pb-[5px]">
                <p className="text-[px]">Delete Feature</p>
                <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setDeleteFeaturesModal(false)}/>
            </div>
            <div className='text-center flex items-center justify-center flex-col'>
                <p className='mt-5'>Are you sure you want to delete {deleteFeatureModal.name} feature?</p>
                {
                    mutation.isPending ?
                    <BtnLoader />
                    :
                    <button className='mt-5 bg-secondary-color w-full text-white py-2 rounded' onClick={handleDelete}>Yes, delete</button>
                }
            </div>
        </div>
    </div>
  )
}

export default DeleteFeaturesModal