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
    const [amount, setAmount] = useState()
    const [graphData, setGraphData] = useState(null)
    const [modal, setModal] = useState(null)
    const [loading, setLoading] = useState(null)

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

    async function getMonitorPrice() {
        const res = await api.get(`/sub-unit/monitor-price`);
        console.log(res.data.data.basePrice);
        setAmount(res.data.data.basePrice)
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
        getGraph()
        getSummary()
        getMonitorPrice()
    },[])

    async function handleMonitorPriceUpdate() {
      if(!amount) {
        alert('Please enter amount');
        return;
      }
      setLoading(true)
      try {
        const response = await api.post('/app-state/price', {
          amount
        });
    
        console.log({response});
    
        if (response.status === 200) {
          alert('Amount updated successfully');
          setModal(null);
          getMonitorPrice()
        } else {
          alert('Failed to update amount');
        }
      } catch (error) {
        console.error('Error updating amount:', error);
        alert('An error occurred while updating the amount');
      }finally {
        setLoading(false)
      }
    }
    
  return (
    <div>
        <>
            <SideNav />
            <div className="w-[78%] ml-auto h-[100dvh]">
                <TopNav />
                <div className="bg-white">
                    <div className="flex items-center justify-between mb-[1rem] px-[30px] py-[1rem] bg-[#F2FCF7]">
                        <p className="text-[28px] text-primary-color font-[600]">Income</p>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setModal("amount")} className="border border-[#2D3934] px-4 py-3 rounded-[8px] text-[14px]">Update Monitor Source Price</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-5 px-5 py-5 rounded-[12px]">
                        <div className="bg-[#1E2522] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#c4c4c4] font-[600]">Institutions</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/buildings.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-white text-[24px]">{data?.totalOrgan?.toLocaleString()}</p>
                        </div>

                        <div className="bg-[#1E2522] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#c4c4c4] font-[600]">Active Plans</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/card-tick.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-white text-[24px]">{data?.activePlans?.toLocaleString()}</p>
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
                                <p className="text-[#4F4F4F] font-[600]">Total Amount Basic Plan</p>
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

                        <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#4F4F4F] font-[600]">Monitor Source Total Paid</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/card-tick.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-text-color text-[24px]">#{data?.monitorSourceTotalPaid?.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                {
                    graphData &&
                    <SubscriptionRevenueChart graphData={graphData}/>
                }
            </div>
        </>
        {
          modal === 'amount' &&
          <>
              <div className="h-full w-full fixed top-0 left-0 z-[99] bg-[#101828] bg-opacity-70" ></div>
              <div className="flex items-center flex-col text-center justify-center gap-3 rounded-[12px] bg-white md:w-[400px] w-[95%] fixed top-[50%] left-[50%] py-[30px] px-[2rem] z-[100]" style={{ transform: "translate(-50%, -50%)" }}>
                <div className='flex items-center justify-between w-full mb-8'>
                  <p className='text-text-color font-[500]'>Update Monitor Source Amount</p>
                  <p className='cursor-pointer' onClick={() => setModal('')}>X</p>
                </div>
                  <input  className='border w-full outline-none p-2 rounded-[4px]' type="text" value={amount} onChange={e => setAmount(e.target.value)} />
                  {
                    loading ? <button className='text-white bg-primary-color rounded-[4px] w-full mt-[0.5rem] py-[10px] text-center mx-auto' disabled>Updating...</button> :
                    <button className='text-white bg-primary-color rounded-[4px] w-full mt-[0.5rem] py-[10px] text-center mx-auto' onClick={handleMonitorPriceUpdate} >Update</button>
                  }
              </div>
          </>
        }
        {/* {
        msg && <Alert msg={"Successfully Logged in"} setMsg={setMsg} alertType={'error'} />
        } */}
    </div>
  )
}

export default Income