"use client"

import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie';
import PageLoader from '../page-loader/PageLoader'
import api from '@/app/utils/Axios-interceptors'
import { useRouter } from 'next/navigation'
import SideNav from '../side-nav/SideNav';
import TopNav from '../top-nav/TopNav';

const DashboardComponent = () => {

  const router = useRouter()

  const {data, isLoading, isError} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await api.get('/summary')
      console.log(data);
      
      return data.data
    }
  })
  
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
                  {/* <button className="">Create User</button> */}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5 px-5 py-5 rounded-[12px]">
                <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-[#4F4F4F] font-[600]">Institutions</p>
                    <div className='bg-[#23AEAE] p-2 rounded-full'>
                      <img src="./images/buildings.svg" alt="" />
                    </div>
                  </div>
                  <p className="font-[600] text-text-color text-[24px]">{data.totalOrgan}</p>
                </div>

                <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-[#4F4F4F] font-[600]">Active Plans</p>
                    <div className='bg-[#23AEAE] p-2 rounded-full'>
                      <img src="./images/card-tick.svg" alt="" />
                    </div>
                  </div>
                  <p className="font-[600] text-text-color text-[24px]">{data?.activePlans}</p>
                </div>

                <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-[#4F4F4F] font-[600]">Total Revenue</p>
                    <div className='bg-[#23AEAE] p-2 rounded-full'>
                      <img src="./images/card-tick.svg" alt="" />
                    </div>
                  </div>
                  <p className="font-[600] text-text-color text-[24px]">#{data?.totalRevenue}</p>
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
                    <p className="text-[#4F4F4F] font-[600]">Sub Revenue</p>
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
      {/* {
        msg && <Alert msg={"Successfully Logged in"} setMsg={setMsg} alertType={'error'} />
      } */}
    </div>
  )
}

export default DashboardComponent