"use client"

import React from 'react'
import SideNav from '../side-nav/SideNav'
import TopNav from '../top-nav/TopNav'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import api from '@/app/utils/Axios-interceptors'
import { CiFilter } from "react-icons/ci";
import { GoChevronDown } from "react-icons/go";



const ManageUsersComponents = () => {

    const router = useRouter()

    const getAllSubs = async () => {
        const { data } = await api.get('/organizations')
        console.log(data);
        return data.data
    }

    const { data: allSubs, isLoading: subLoading, isError: subError } = useQuery({
        queryKey: ['subscriptions'],
        queryFn: getAllSubs,
    });

  return (
    <div>
        <>
            <SideNav />
            <div className="w-[78%] ml-auto h-[100dvh]">
                <TopNav />
                <div className="flex items-center justify-between mb-[1rem] px-[30px] py-[1rem] bg-[#F2FCF7]">
                    <p className="text-[28px] text-primary-color font-[600]">Manage users</p>
                    {/* <div className="flex items-center gap-3">
                        <button  className="bg-white text-[#2D3934] px-4 py-3 rounded-[8px] text-[14px] flex items-center gap-2 font-[600]">
                            <CiFilter className="text-[#2D3934] text-[14px]"/>
                            <p className='border-l pl-3'>Filter</p>
                            <GoChevronDown className="text-[#2D3934] text-[14px] ml-2"/>
                        </button>
                    </div> */}
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-left">
                        <thead className="text-[14px] border-b">
                            <tr>
                                <th scope="col" className="px-6 py-3 th1 font-[700]">S/N</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Name</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Email</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Phone</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Date Joined</th>
                                {/* <th scope="col" className="px-6 py-3 font-[700]">Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allSubs && allSubs.map((plan: any, index: number) => {
                                    return(
                                        <tr style={{borderBottom:"1px solid #dcdcdc"}} key={index}>
                                            <td className="px-6 py-4">{index +1}</td>
                                            <td className="px-6 py-4">{plan.nameOfEstablishment}</td>
                                            <td className="px-6 py-4">{plan.email}</td>
                                            <td className="px-6 py-4">{plan.phone}</td>
                                            <td className="px-6 py-4">{`${plan.createdAt}`.slice(0, 10)}</td>
                                            {/* <td className="px-6 py-4">
                                                <button onClick={() => router.replace(`subscription/${plan._id}`)} className='bg-gray-400 px-3 py-2 rounded-[5px] text-white'>View</button>
                                            </td> */}
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

export default ManageUsersComponents