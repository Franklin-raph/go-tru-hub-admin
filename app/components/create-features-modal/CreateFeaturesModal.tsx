"use client"

import api from '@/app/utils/Axios-interceptors'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { IoCloseOutline } from 'react-icons/io5'
import { z } from 'zod'
import BtnLoader from '../btn-Loader/BtnLoader'

const createFeatureSchema = z.object({
    name: z.string().min(3, "Name is required")
})

type TCreateFeatureSchema = z.infer<typeof createFeatureSchema>;

type CreateFeaturesModalProps = {
    setCreateFeaturesModal: any
}

const CreateFeaturesModal = ({ setCreateFeaturesModal } : CreateFeaturesModalProps) => {
    const {
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TCreateFeatureSchema>({
        resolver: zodResolver(createFeatureSchema)
    })

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (values: TCreateFeatureSchema) => {
            const { data } = await api.post('/features', { name: values.name });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['features'] });
            reset();
            setCreateFeaturesModal(false);
        },
        onError: (error) => {
            console.error('Error creating feature:', error);
        },
    });

    const createFeature = async (values: TCreateFeatureSchema) => {
        mutation.mutate(values);
    };

    return (
        <div>
            <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background: "rgba(14, 14, 14, 0.58)" }} onClick={() => setCreateFeaturesModal(false)}></div>
            <div className="bg-white w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                <div className="flex items-center justify-between border-b pb-[5px]">
                    <p className="text-[16px]">Create Feature</p>
                    <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setCreateFeaturesModal(false)} />
                </div>
                <form onSubmit={handleSubmit(createFeature)} className='flex flex-col'>
                    <input
                        type="text"
                        {...register('name')}
                        className='outline-none border border-gray-300 w-full mt-5 px-3 py-2 rounded'
                    />
                    {errors.name && <p className='text-red-500 text-[14px] text-left mt-1'>{errors.name.message}</p>}
                    {
                        mutation.isPending ?
                        <BtnLoader />
                        :
                        <button type='submit' disabled={isSubmitting} className='mt-5 bg-secondary-color w-full text-white py-[8px] rounded'>Create Feature</button>
                    }
                    {mutation.isError && <p className='text-red-500 text-[14px] text-left mt-1'>Error creating feature</p>}
                </form>
            </div>
        </div>
    )
}

export default CreateFeaturesModal;
