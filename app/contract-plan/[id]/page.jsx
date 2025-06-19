"use client"

import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import Cookies from "js-cookie";
import { useParams, useRouter } from 'next/navigation';
import { IoCloseOutline } from 'react-icons/io5';

const ContractPlanInfo = () => {

    const [contractPlan, setContractPlan] = useState();
    const [terminate, setTerminate] = useState(false);
    const router = useRouter()
    const { id } = useParams()
    console.log(id);
    
    async function getAllContractPlans(){
        try {
            const response = await fetch(`https://go-tru-hub-api.onrender.com/contract-plan/single/${id}`,
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

    async function terminateContract() {
        try {
            const response = await fetch(`https://go-tru-hub-api.onrender.com/contract-plan/terminate/${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });
            const data = await response.json();
            alert(data.message)
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
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
                            <button  className="py-3 px-4 bg-[#cd1919] text-[#fff] rounded-[8px] text-[14px] font-[600] shadow-md" onClick={() => setTerminate(true)} >Terminate Contract Plan</button>
                            {/* <button className="bg-[#2D3934] text-white px-4 py-3 rounded-[8px] font-[600] text-[14px]">Create Feature</button> */}
                        </div>
                    </div>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-left">
                        <thead className="text-[14px] border-b">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-[700]">Amount</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Paid Status</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Plan Validity(in number of days)</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Is Contract</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Quantity</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Quantity Left</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='cursor-pointer' style={{borderBottom:"1px solid #dcdcdc"}}>
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
                <div className='p-4'>
                    <p className='font-bold mb-2 underline'>Features Subscribed For</p>
                    {
                        contractPlan?.subscriptionType?.feature?.map((f, index) => (
                            <p key={index}>{index+1}. {f.name}</p>
                        ))
                    }
                </div>
                <div className='p-4'>
                    <p className='font-bold mb-2 underline'>Plan Name</p>
                    <p>{contractPlan?.subscriptionType?.name}</p>
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

        {
            terminate &&
            <>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setTerminate(false)}></div>
                <div className="bg-white w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[22px]">Terminate Contract</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setTerminate(false)}/>
                    </div>
                    <div className='text-center flex items-center justify-center flex-col'>
                        <img src="./images/logout-question.svg" alt="" className='mt-9'/>
                        <div className='my-5'>
                            <p className='text-[#19201D] mb-4'>Terminate Contract</p>
                            <p className='text-[#828282] text-[14px]'>
                                Are you sure, you want to terminate this organization's contract?
                            </p>
                        </div>
                        <div className='flex items-center gap-5 mt-3 pb-5'>
                            <button className='border-[#19201D] border px-5 py-2 rounded-[4px] text-[14px]' onClick={() => setTerminate(false)}>No</button>
                            <button className='bg-[#23b94b] text-white px-5 py-2 rounded-[4px] text-[14px]' onClick={terminateContract} >Yes, Continue</button>
                        </div>
                    </div>
                </div>
            </>
        }
    </div>
  )
}

export default ContractPlanInfo