"use client"

import React, { useEffect, useState } from 'react'
// import SideNav from '../../components/side-nav/SideNav'
import TopNav from '@/app/components/top-nav/TopNav'
import Cookies from "js-cookie";
import { useParams, useRouter } from 'next/navigation';
import SubCard from '@/app/components/sub-card/SubCard'
import ConfirmSubModal from '@/app/components/confirm-sub-modal/ConfirmSubModal'
import { FaDownload } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import Link from 'next/link';
import SideNav from '@/app/components/side-nav/SideNav';

const MonitorSource = () => {

    const { id } = useParams();
    const [contractData, setContractData] = useState()

    async function getAll(){
        const res = await fetch('https://test.yamltech.com/monitor-source/all/'+id,{
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        })
        const data = await res.json()
        setContractData(data.data)
        
        console.log(data)
    }
    
    async function getUnpaid(){
        const res = await fetch('https://test.yamltech.com/monitor-source/all/unpaid/'+id,{
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        })
        const data = await res.json()
        setContractData(data.data)

        console.log(data)
    }

    async function waveContract(itemId){
        console.log(itemId);
        
        const res = await fetch(`https://test.yamltech.com/monitor-source/${itemId}`,{
            method:"PUT",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        })
        const data = await res.json()
        if(res.ok){
            alert('Wave Contract Successfully')
            getUnpaid()
        }
        console.log(res, data);
    }

    useEffect(() => {
        getAll()
    }, [])

  return (
    <div>
        <>
            <SideNav />
            <div className="w-[78%] ml-auto h-[100dvh]">
                <TopNav />
                <div className="px-[30px] py-[1rem]">
                    <div className="flex items-center justify-between mb-[3rem]">
                        <div>
                            <p className="text-[28px] text-primary-color font-[600]">Monitor Source Contract Plan</p>
                            {/* <p className='text-[#828282]'>Your current pricing system is set to,</p> */}
                        </div>
                        <div className='flex gap-3'>
                            <button className='bg-[#1E2522] px-4 rounded-[6px] py-2 text-[#fff]' onClick={getAll}>All</button>
                            <button className='bg-[#1E2522] px-4 rounded-[6px] py-2 text-[#fff]' onClick={getUnpaid}>Unpaid</button>
                        </div>
                    </div>
                </div>
                <div className='px-[10px] md:px-[30px]'>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-left">
                            <thead className="text-[14px] border-b">
                                <tr>
                                <th scope="col" className="px-6 py-3 th1 font-[700]">
                                    S/N
                                </th>
                                <th scope="col" className="px-6 py-3 font-[700]">
                                    Course Name
                                </th>
                                <th scope="col" className="px-6 py-3 font-[700]">
                                    Course Code
                                </th>
                                <th scope="col" className="px-6 py-3 font-[700]">
                                    Session
                                </th>
                                <th scope="col" className="px-6 py-3 font-[700]">
                                    Term/Semester
                                </th>
                                <th scope="col" className="px-6 py-3 font-[700]">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3 font-[700]">
                                    Action
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {contractData?.map((data, index) => (
                                    <tr
                                        style={{ borderBottom: "1px solid #dcdcdc" }}
                                        key={index}
                                    >
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">{data?.course?.name}</td>
                                        <td className="px-6 py-4">{data?.course?.courseCode}</td>
                                        <td className="px-6 py-4">{data?.term?.sessionId?.name}</td>
                                        <td className="px-6 py-4">{data.term?.name}</td>
                                        <td className="px-6 py-4">{data.amount}</td>
                                        <td className="px-6 py-4">
                                            {
                                                data?.paid === false &&
                                                <button onClick={() => waveContract(data._id)} className='bg-[#1E2522] px-3 rounded-[6px] py-[6px] text-[#fff]'>Wave</button>
                                            }
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    </div>
  )
}

export default MonitorSource