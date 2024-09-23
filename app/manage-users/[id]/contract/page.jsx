"use client"

import React, { useEffect, useState } from 'react'
import SideNav from '../../../components/side-nav/SideNav'
import TopNav from '../../../components/top-nav/TopNav'
import Cookies from "js-cookie";
import { useParams, useRouter } from 'next/navigation';
import SubCard from '../../../components/sub-card/SubCard'
import ConfirmSubModal from '../../../components/confirm-sub-modal/ConfirmSubModal'

const Contract = () => {

    const [contractPlan, setContractPlan] = useState();
    const [confirmSubModal, setConfirmSubModal] = useState(false)
    const router = useRouter()
    const { id } = useParams()
    const [arrayOfFeatures, setArrayOfFeatures] = useState([])
    console.log(id);
    
    async function getAllContractPlans(){
        try {
            const response = await fetch(`https://test.yamltech.com/contract-plan/single/${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            }
        );
            const data = await response.json();
            setContractPlan(data.data);
            console.log(data);
            
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getAllContractPlans()
        getSubs()
    },[])

    async function getSubs(){
        const res = await fetch(`https://test.yamltech.com/subscriptions`,{
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            }
        })
        const data = await res.json()
        setArrayOfFeatures(data.data)
        console.log(data);
    }

  return (
    <div>
        <>
            <SideNav />
            <div className="w-[78%] ml-auto h-[100dvh]">
                <TopNav />
                <div className="px-[30px] py-[1rem]">
                    <div className="flex items-center justify-between mb-[3rem]">
                        <div>
                            <p className="text-[28px] text-primary-color font-[600]">Contract Plans</p>
                            {/* <p className='text-[#828282]'>Your current pricing system is set to,</p> */}
                        </div>
                        <div className="flex items-center gap-3">
                            {/* <button  className="py-3 px-4 bg-[#FFFFFF] rounded-[8px] text-[14px] font-[600] shadow-md" onClick={() => router.replace('/subscription')} >Contract plan</button> */}
                            <button className="bg-[#2D3934] text-white px-4 py-3 rounded-[8px] font-[600] text-[14px]" onClick={() => router.replace(`/manage-users/${id}/orgz-plan`)} >Cart</button>
                        </div>
                    </div>
                </div>
                <div className='px-[10px] md:px-[30px]'>
                    <p className='font-[500] text-[20px] mb-2'>Subscription Plans</p>
                    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
                        {
                            arrayOfFeatures && arrayOfFeatures?.map((plan, index) => (
                                <SubCard key={index} plan={plan} setConfirmSubModal={setConfirmSubModal}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
        {
            confirmSubModal && <ConfirmSubModal id={id} setConfirmSubModal={setConfirmSubModal}/>
        }
    </div>
  )
}

export default Contract