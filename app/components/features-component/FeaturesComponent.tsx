'use client'

import React, { useState } from 'react'
import SideNav from '../side-nav/SideNav'
import TopNav from '../top-nav/TopNav'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import api from '@/app/utils/Axios-interceptors'
import PageLoader from '../page-loader/PageLoader'
import { CiEdit } from "react-icons/ci";
import EditFeaturesModal from '../edit-features-modal/EditFeaturesModal'
import CreateFeaturesModal from '../create-features-modal/CreateFeaturesModal'


const FeaturesComponent = () => {
    const router = useRouter()
    const [eidtFeatureModal, setEditFeaturesModal] = useState<Boolean>(false)
    const [createFeatureModal, setCreateFeaturesModal] = useState<Boolean>(false)

    const { data, isLoading, isError } = useQuery({
        queryKey: ['features'],
        queryFn: async () => {
            const { data } = await api.get('/features')
            console.log(data);
            
            return data.data
        }
    })

    if(isLoading)
        return <PageLoader />
    
    if(isError)
        return <div>Sorry There was an Error</div>

  return (
    <div>
        <>
            <SideNav />
            <div className="w-[78%] ml-auto h-[100dvh]">
                <TopNav />
                <div className="px-[30px] py-[1rem]">
                    <div className="flex items-center justify-between mb-[3rem]">
                        <div>
                            <p className="text-[28px] text-primary-color font-[600]">Features</p>
                            {/* <p className='text-[#828282]'>Your current pricing system is set to,</p> */}
                        </div>
                        <div className="flex items-center gap-3">
                            {/* <button  className="py-3 px-4 bg-[#FFFFFF] rounded-[8px] text-[14px] font-[600] shadow-md" onClick={() => router.replace('/subscription')} >Contract plan</button> */}
                            <button className="bg-[#2D3934] text-white px-4 py-3 rounded-[8px] font-[600] text-[14px]" onClick={() => setCreateFeaturesModal(true)}>Create Feature</button>
                        </div>
                    </div>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-left">
                        <thead className="text-[14px] border-b">
                            <tr>
                                <th scope="col" className="px-6 py-3 th1 font-[700]">S/N</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Feature name</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Edit</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Delete</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.map((feature: any, index: number) => {
                                    return(
                                        <tr style={{borderBottom:"1px solid #dcdcdc"}} key={index}>
                                            <td className="px-6 py-4">{index +1}</td>
                                            <td className="px-6 py-4">{feature.name}</td>
                                            <td className="px-6 py-4">
                                                <CiEdit className="text-[#2D3934] cursor-pointer" onClick={() => setEditFeaturesModal(feature)}/>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
        {
            eidtFeatureModal &&
            <EditFeaturesModal setEditFeaturesModal={setEditFeaturesModal} eidtFeatureModal={eidtFeatureModal}/>
        }

        {
            createFeatureModal &&
            <CreateFeaturesModal setCreateFeaturesModal={setCreateFeaturesModal} />
        }
    </div>
  )
}

export default FeaturesComponent