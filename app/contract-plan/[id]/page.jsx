"use client"

import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import Cookies from "js-cookie";
import { useParams, useRouter } from 'next/navigation';

const page = () => {

    const [contractPlan, setContractPlan] = useState();
    const router = useRouter()
    const { id } = useParams()
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
    },[])

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
                            <button className="bg-[#2D3934] text-white px-4 py-3 rounded-[8px] font-[600] text-[14px]">Create Feature</button>
                        </div>
                    </div>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-left">
                        <thead className="text-[14px] border-b">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-[700]">Org. name</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Amount</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Paid Status</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Plan Validity</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Is Contract</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Quantity</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Quantity Left</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='cursor-pointer' style={{borderBottom:"1px solid #dcdcdc"}} onClick={() => router.replace(`/contract-plan/${plan._id}`)} >
                                <td className="px-6 py-4">{contractPlan?.Organization?.nameOfEstablishment}</td>
                                <td className="px-6 py-4">{contractPlan?.amount}</td>
                                <td className="px-6 py-4">{contractPlan?.paidStatus.toString()}</td>
                                <td className="px-6 py-4">{contractPlan?.planValidity}</td>
                                <td className="px-6 py-4">{contractPlan?.isContract.toString()}</td>
                                <td className="px-6 py-4">{contractPlan?.quantity}</td>
                                <td className="px-6 py-4">{contractPlan?.quantityLeft}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
        {/* {
            eidtFeatureModal &&
            <EditFeaturesModal setEditFeaturesModal={setEditFeaturesModal} eidtFeatureModal={eidtFeatureModal}/>
        }

        {
            createFeatureModal &&
            <CreateFeatureModal setCreateFeaturesModal={setCreateFeaturesModal} />
        }

        {
            deleteFeatureModal &&
            <DeleteFeaturesModal setDeleteFeaturesModal={setDeleteFeaturesModal} deleteFeatureModal={deleteFeatureModal} />
        } */}
    </div>
  )
}

export default page