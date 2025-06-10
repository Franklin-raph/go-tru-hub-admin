"use client"

import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie';
import PageLoader from '../components/page-loader/PageLoader'
import api from '@/app/utils/Axios-interceptors'
import { useRouter } from 'next/navigation'
import SideNav from '../components/side-nav/SideNav';
import TopNav from '../components/top-nav/TopNav';
import { useEffect, useState } from 'react';
import SubscriptionRevenueChart from '../components/subscriptionRevenueChart/SubscriptionRevenueChart';

const Income = () => {

    const router = useRouter()

    // const {data, isLoading, isError} = useQuery({
    //   queryKey: ['users'],
    //   queryFn: async () => {
    //     const { data } = await api.get('/summary')
    //     console.log(data);
        
    //     return data.data
    //   }
    // })
    
    // if (isLoading) return <PageLoader />;
    // if (isError) return <div>Sorry There was an Error</div>
    const [data, setData] = useState()
    const [graphData, setGraphData] = useState(null)

    async function getSummary() {
        const res = await fetch(`https://go-tru-hub-api.onrender.com/summary`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            }
        });
        const data = await res.json();
        console.log(data);
        setData(data.data)
    }

    
    async function getGraph(){
        const res = await fetch(`https://go-tru-hub-api.onrender.com/graph`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            }
        });
        const data = await res.json();
        setGraphData(data)
        console.log(data);
    }

    useEffect(() => {
        getSummary()
        getGraph()
    },[])
    
  return (
    <div>
        <>
            <SideNav />
            <div className="w-[78%] ml-auto h-[100dvh]">
                <TopNav />
                <div className="bg-white">
                    <div className="flex items-center justify-between mb-[1rem] px-[30px] py-[1rem] bg-[#F2FCF7]">
                        <p className="text-[28px] text-primary-color font-[600]">Income</p>
                        <div className="flex items-center gap-3"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-5 px-5 py-5 rounded-[12px]">
                        <div className="bg-[#1E2522] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#c4c4c4] font-[600]">Institutions</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/buildings.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-white text-[24px]">{data?.totalOrgan}</p>
                        </div>

                        <div className="bg-[#1E2522] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#c4c4c4] font-[600]">Active Plans</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/card-tick.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-white text-[24px]">{data?.activePlans}</p>
                        </div>

                        <div className="bg-[#1E2522] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#c4c4c4] font-[600]">Total Revenue</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/card-tick.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-white text-[24px]">#{data?.totalRevenue?.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-5 px-5 py-5 rounded-[12px]">
                        <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#4F4F4F] font-[600]">Total AmountBasic Plan</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/buildings.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-text-color text-[24px]">#{data?.totalAmountBasicPlan?.toLocaleString()}</p>
                        </div>

                        <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#4F4F4F] font-[600]">Total Amount Bulk Plan</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/card-tick.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-text-color text-[24px]">#{data?.totalAmountBulkPlan?.toLocaleString()}</p>
                        </div>

                        <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#4F4F4F] font-[600]">Total Amount Combo Plan</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/card-tick.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-text-color text-[24px]">#{data?.totalAmountComboPlan?.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-5 px-5 py-5 rounded-[12px]">
                        <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#4F4F4F] font-[600]">Sub Revenue</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/buildings.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-text-color text-[24px]">#{data?.subRevenue?.toLocaleString()}</p>
                        </div>

                        <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#4F4F4F] font-[600]">Total Amount Contract</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/card-tick.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-text-color text-[24px]">#{data?.totalAmountContract?.toLocaleString()}</p>
                        </div>

                        <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#4F4F4F] font-[600]">Total Amount Result Plan</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/card-tick.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-text-color text-[24px]">#{data?.totalAmountResultPlan?.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                {
                    graphData &&
                    <SubscriptionRevenueChart graphData={graphData}/>
                }
            </div>
        </>
        {/* {
        msg && <Alert msg={"Successfully Logged in"} setMsg={setMsg} alertType={'error'} />
        } */}
    </div>
  )
}

export default Income