"use client"

import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie';
import PageLoader from '../page-loader/PageLoader'
import api from '@/app/utils/Axios-interceptors'
import { useRouter } from 'next/navigation'
import SideNav from '../side-nav/SideNav';
import TopNav from '../top-nav/TopNav';
import { useEffect, useState } from 'react';

const DashboardComponent = () => {

  const router = useRouter()
  const [modal, setModal] = useState<string | null>(null)
  const [scanRange, setScanRange] = useState<string>('')
  const token = Cookies.get('token');

  const {data, isLoading, isError} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await api.get('/summary')
      console.log(data);
      
      return data.data
    }
  })

  async function handleLocationRangeUpdate() {
    if(!scanRange) {
      alert('Please enter a scan range');
      return;
    }
    try {
      const response = await api.post('/app-state/scan-range', {
        scanRange
      });

      console.log({response});

      if (response.status === 200) {
        alert('Scan range updated successfully');
        setModal(null);
      } else {
        alert('Failed to update scan range');
      }
    } catch (error) {
      console.error('Error updating scan range:', error);
      alert('An error occurred while updating the scan range');
    }
  }


  // async function getScanRangee() {
  //     const res = await api.get(`/app-state/scan-range`);
  //     console.log(res);
  //     // setAmount(res.data.data.basePrice)
  // }

  useEffect(() => {
    // getScanRangee()
  },[])
  
  if (isLoading) return <PageLoader />;
  if (isError) return <div>Sorry There was an Error</div>


  return (
    <div>
      <>
        <SideNav />
        <div className="w-[78%] ml-auto h-[100dvh]">
          <TopNav />
            <div className="bg-white">
              <div className="flex items-center justify-between mb-[1rem] px-[30px] py-[1rem] bg-[#F2FCF7]">
                <p className="text-[28px] text-primary-color font-[600]">Dashboard</p>
                <div className="flex items-center gap-3">
                  <button  className="bg-[#2D3934] text-white px-4 py-3 rounded-[8px] text-[14px]" onClick={() => router.replace('/subscription')} >Subscription</button>
                  <button onClick={() => setModal("location")} className="border border-[#2D3934] px-4 py-3 rounded-[8px] text-[14px]">Update Location Range</button>
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
                  <p className="font-[600] text-white text-[24px]">{data.totalOrgan}</p>
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
                  <p className="font-[600] text-white text-[24px]">#{data?.totalRevenue}</p>
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
                  <p className="font-[600] text-text-color text-[24px]">#{data?.totalAmountBasicPlan}</p>
                </div>

                <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-[#4F4F4F] font-[600]">Total Amount Bulk Plan</p>
                    <div className='bg-[#23AEAE] p-2 rounded-full'>
                      <img src="./images/card-tick.svg" alt="" />
                    </div>
                  </div>
                  <p className="font-[600] text-text-color text-[24px]">#{data?.totalAmountBulkPlan}</p>
                </div>

                <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-[#4F4F4F] font-[600]">Total Amount Combo Plan</p>
                    <div className='bg-[#23AEAE] p-2 rounded-full'>
                      <img src="./images/card-tick.svg" alt="" />
                    </div>
                  </div>
                  <p className="font-[600] text-text-color text-[24px]">#{data?.totalAmountComboPlan}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5 px-5 py-5 rounded-[12px]">
                <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-[#4F4F4F] font-[600]">Total Revenue</p>
                    <div className='bg-[#23AEAE] p-2 rounded-full'>
                      <img src="./images/buildings.svg" alt="" />
                    </div>
                  </div>
                  <p className="font-[600] text-text-color text-[24px]">#{data?.subRevenue}</p>
                </div>

                <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-[#4F4F4F] font-[600]">Total Amount Contract</p>
                    <div className='bg-[#23AEAE] p-2 rounded-full'>
                      <img src="./images/card-tick.svg" alt="" />
                    </div>
                  </div>
                  <p className="font-[600] text-text-color text-[24px]">#{data?.totalAmountContract}</p>
                </div>

                <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-[#4F4F4F] font-[600]">Total Amount Result Plan</p>
                    <div className='bg-[#23AEAE] p-2 rounded-full'>
                      <img src="./images/card-tick.svg" alt="" />
                    </div>
                  </div>
                  <p className="font-[600] text-text-color text-[24px]">#{data?.totalAmountResultPlan}</p>
                </div>
              </div>
            </div>
          </div>
      </>
      {
          modal === 'location' &&
          <>
              <div className="h-full w-full fixed top-0 left-0 z-[99] bg-[#101828] bg-opacity-70" ></div>
              <div className="flex items-center flex-col text-center justify-center gap-3 rounded-[12px] bg-white md:w-[400px] w-[95%] fixed top-[50%] left-[50%] py-[30px] px-[2rem] z-[100]" style={{ transform: "translate(-50%, -50%)" }}>
                <div className='flex items-center justify-between w-full mb-8'>
                  <p className='text-text-color font-[500]'>Update Scan Range</p>
                  <p className='cursor-pointer' onClick={() => setModal('')}>X</p>
                </div>
                  <input  className='border w-full outline-none p-2 rounded-[4px]' type="text" onChange={e => setScanRange(e.target.value)} />
                  <button className='text-white bg-primary-color rounded-[4px] w-full mt-[0.5rem] py-[10px] text-center mx-auto' onClick={handleLocationRangeUpdate} >Update</button>
              </div>
          </>
      }
      {/* {
        msg && <Alert msg={"Successfully Logged in"} setMsg={setMsg} alertType={'error'} />
      } */}
    </div>
  )
}

export default DashboardComponent