"use client"

import React, { useState } from 'react'
import SideNav from '../side-nav/SideNav'
import TopNav from '../top-nav/TopNav'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import api from '@/app/utils/Axios-interceptors'
import PageLoader from '../page-loader/PageLoader'
import { IoIosTrash } from 'react-icons/io'
import { CiEdit } from 'react-icons/ci'

const SubscriptionComponent = () => {

    const router = useRouter()
    const [eidtFeatureModal, setEditFeaturesModal] = useState<Boolean>(false)
    const [createFeatureModal, setCreateFeaturesModal] = useState<Boolean>(false)
    const [deleteFeatureModal, setDeleteFeaturesModal] = useState<Boolean>(false)

    const getAllSubs = async () => {
        const { data } = await api.get('/subscriptions')
        console.log(data);
        return data.data
    }

    const { data: allSubs, isLoading: subLoading, isError: subError } = useQuery({
        queryKey: ['subscriptions'],
        queryFn: getAllSubs,
    });


    // const {data, isLoading, isError} = useQuery({
    //     queryKey: ['subscriptions'],
    //     queryFn: async () => {
    //         const { data } = await api.get('/subscriptions')
    //         console.log(data);
    //         return data
    //     }
    // })

    // if (isLoading) return <PageLoader />;
    // if (isError) return <div>Sorry There was an Error</div>

  return (
    <div>
        <>
            <SideNav />
            <div className="w-[78%] bg-[#F2FCF7] ml-auto h-[100dvh]">
                <TopNav />
                <div className="px-[30px] py-[1rem]">
                    <div className="flex items-center justify-between mb-[3rem]">
                        <div>
                            <p className="text-[28px] text-primary-color font-[600]">Subscription</p>
                            <p className='text-[#828282]'>Your current pricing system is set to,</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button  className="py-3 px-4 bg-[#FFFFFF] rounded-[8px] text-[14px] font-[600] shadow-md" onClick={() => router.replace('/subscription')} >Contract plan</button>
                            <button className="bg-[#2D3934] text-white px-4 py-3 rounded-[8px] font-[600] text-[14px]" onClick={() => router.replace('/create-sub')}>Create Plan</button>
                        </div>
                    </div>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-left">
                        <thead className="text-[14px] border-b">
                            <tr>
                                <th scope="col" className="px-6 py-3 th1 font-[700]">S/N</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Plan</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Plan Duration</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Plan Validity</th>
                                <th scope="col" className="px-6 py-3 font-[700]">View Plan Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allSubs && allSubs.map((plan: any, index: number) => {
                                    return(
                                        <tr style={{borderBottom:"1px solid #dcdcdc"}} key={index}>
                                            <td className="px-6 py-4">{index +1}</td>
                                            <td className="px-6 py-4">{plan.name}</td>
                                            <td className="px-6 py-4">{plan.duration}</td>
                                            <td className="px-6 py-4">{plan.planValidity}</td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => router.replace(`subscription/${plan._id}`)} className='bg-gray-400 px-3 py-2 rounded-[5px] text-white'>View</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    </div>
  )
}

export default SubscriptionComponent