"use client"

import React from 'react'
import SideNav from '../side-nav/SideNav'
import TopNav from '../top-nav/TopNav'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import api from '@/app/utils/Axios-interceptors'
import PageLoader from '../page-loader/PageLoader'

const SubscriptionComponent = () => {

    const router = useRouter()

    const {data, isLoading, isError} = useQuery({
        queryKey: ['subscriptions'],
        queryFn: async () => {
            const { data } = await api.get('/subscriptions')
            console.log(data);
            
            return data
        }
    })

    if (isLoading) return <PageLoader />;
    if (isError) return <div>Sorry There was an Error</div>

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
            </div>
        </>
    </div>
  )
}

export default SubscriptionComponent