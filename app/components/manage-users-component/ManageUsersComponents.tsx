"use client"

import React, { useState, useMemo } from 'react'
import SideNav from '../side-nav/SideNav'
import TopNav from '../top-nav/TopNav'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import api from '@/app/utils/Axios-interceptors'

const ManageUsersComponents = () => {

    const router = useRouter()
    const [filter, setFilter] = useState<string>("")

    const getAllUsers = async () => {
        const { data } = await api.get('/organizations')
        console.log(data);
        return data.data
    }

    const { data: allUsers, isLoading: subLoading, isError: subError } = useQuery({
        queryKey: ['subscriptions'],
        queryFn: getAllUsers,
    });

    // Filtered users based on selected institution type
    const filteredUsers = useMemo(() => {
        console.log(filter);
        
        if (!filter) return allUsers;
        return allUsers?.filter((user: any) => user.institutionType === filter);
    }, [filter, allUsers]);

    return (
        <div>
            <>
                <SideNav />
                <div className="w-[78%] ml-auto h-[100dvh]">
                    <TopNav />
                    <div className="flex items-center justify-between mb-[1rem] px-[30px] py-[1rem] bg-[#F2FCF7]">
                        <p className="text-[28px] text-primary-color font-[600]">Manage users</p>
                        <select 
                            className="bg-white text-[#2D3934] px-4 py-3 rounded-[8px] text-[14px] flex items-center gap-2 font-[600] cursor-pointer outline-none"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="">--Select Institution type--</option>
                            <option value="primary">Primary Institution</option>
                            <option value="secondary">Secondary Institution</option>
                            <option value="tetiary">Tertiary Institution</option>
                        </select>
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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredUsers && filteredUsers.map((user: any, index: number) => (
                                        <tr style={{borderBottom:"1px solid #dcdcdc"}} key={index}>
                                            <td className="px-6 py-4">{index + 1}</td>
                                            <td className="px-6 py-4">{user.nameOfEstablishment}</td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">{user.phone}</td>
                                            <td className="px-6 py-4">{`${user.createdAt}`.slice(0, 10)}</td>
                                        </tr>
                                    ))
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
