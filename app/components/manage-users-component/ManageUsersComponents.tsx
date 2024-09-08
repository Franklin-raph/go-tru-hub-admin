"use client"

import React, { useState, useMemo } from 'react'
import SideNav from '../side-nav/SideNav'
import TopNav from '../top-nav/TopNav'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import api from '@/app/utils/Axios-interceptors'
import { IoCloseOutline } from 'react-icons/io5'
import Cookies from 'js-cookie'
import BtnLoader from '../btn-Loader/BtnLoader'

const ManageUsersComponents = () => {

    const router = useRouter()
    const [filter, setFilter] = useState<string>("")
    const [deactivateAcct, setDeactivateAcct] = useState<string>("")
    const [activateAcct, setActivateAcct] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const getAllUsers = async () => {
        const { data } = await api.get('/organizations')
        console.log(data);
        return data.data
    }

    // Destructure refetch from useQuery
    const { data: allUsers, isLoading: subLoading, isError: subError, refetch } = useQuery({
        queryKey: ['subscriptions'],
        queryFn: getAllUsers,
    });

    // Filtered users based on selected institution type
    const filteredUsers = useMemo(() => {
        console.log(filter);
        if (!filter) return allUsers;
        return allUsers?.filter((user: any) => user.institutionType === filter);
    }, [filter, allUsers]);

    async function deactivateAcctFn(id: string) {
        console.log(`https://test.yamltech.com/organizations/deactivate-acccount/${id}?status=false`);
        setLoading(true)
        // Call API to deactivate user
        const res = await fetch(`https://test.yamltech.com/organizations/deactivate-acccount/${id}?status=false`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
        })

        const data = await res.json()
        if(res) setLoading(false)
        if (res.ok) {
            setDeactivateAcct('')
            // Trigger refetch after deactivation
            refetch()
            alert(data.message)
        }
        console.log(res, data);
    }

    async function activateAcctFn(id: string) {
        console.log(`https://test.yamltech.com/organizations/deactivate-acccount/${id}?status=true`);
        setLoading(true)
        // Call API to activate user
        const res = await fetch(`https://test.yamltech.com/organizations/deactivate-acccount/${id}?status=true`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
        })

        const data = await res.json()
        if(res) setLoading(false)
        if (res.ok) {
            setActivateAcct('')
            // Trigger refetch after activation
            refetch()
            alert(data.message)
        }
        console.log(res, data);
    }

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
                                    <th scope="col" className="px-6 py-3 font-[700]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredUsers && filteredUsers.map((user: any, index: number) => (
                                        <tr style={{ borderBottom: "1px solid #dcdcdc" }} key={index}>
                                            <td className="px-6 py-4">{index + 1}</td>
                                            <td className="px-6 py-4">{user.nameOfEstablishment}</td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">{user.phone}</td>
                                            <td className="px-6 py-4">{`${user.createdAt}`.slice(0, 10)}</td>
                                            {
                                                user?.isActive === true ?
                                                    <td className="px-6 py-4" onClick={() => setDeactivateAcct(user._id)}>
                                                        <button className='border border-red-300 rounded-[4px] px-3 py-[6px] text-[12px]'>Deactivate Account</button>
                                                    </td>
                                                    :
                                                    <td className="px-6 py-4" onClick={() => setActivateAcct(user._id)}>
                                                        <button className='border border-green-300 rounded-[4px] px-3 py-[6px] text-[12px]'>Activate Account</button>
                                                    </td>
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
            {
                deactivateAcct &&
                <div>
                    <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background: "rgba(14, 14, 14, 0.58)" }} onClick={() => setDeactivateAcct('')}></div>
                    <div className="bg-white w-[90%] sm:max-w-[450px] fixed top-[50%] left-[50%] pt-[20px] md:px-[2rem] px-[16px] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                        <div className="flex items-center justify-between border-b pb-[5px]">
                            <p className="text-[px]">Deactivate Account</p>
                            <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setDeactivateAcct('')} />
                        </div>
                        <div className='mt-5 text-center'>
                            Are you sure, you want to deactivate this users accounnt?
                        </div>
                        {
                            loading ?
                                <BtnLoader />
                                :
                                <button onClick={() => deactivateAcctFn(deactivateAcct)} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Yes, Deactivate</button>
                        }
                    </div>
                </div>
            }
            {
                activateAcct &&
                <div>
                    <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background: "rgba(14, 14, 14, 0.58)" }} onClick={() => setActivateAcct('')}></div>
                    <div className="bg-white w-[90%] sm:max-w-[450px] fixed top-[50%] left-[50%] pt-[20px] md:px-[2rem] px-[16px] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                        <div className="flex items-center justify-between border-b pb-[5px]">
                            <p className="text-[px]">Activate Account</p>
                            <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setActivateAcct('')} />
                        </div>
                        <div className='mt-5 text-center'>
                            Are you sure, you want to activate this users accounnt?
                        </div>
                        {
                            loading ?
                                <BtnLoader />
                                :
                                <button onClick={() => activateAcctFn(activateAcct)} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Yes, Activate</button>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default ManageUsersComponents
