"use client"

import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import Cookies from "js-cookie";
import { useParams, useRouter } from 'next/navigation';
import SubCard from '../../components/sub-card/SubCard'
import ConfirmSubModal from '../../components/confirm-sub-modal/ConfirmSubModal'
import { FaDownload } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import Link from 'next/link';

const ManageUserInfo = () => {

    const [orgInfo, setOrgInfo] = useState();
    const [confirmSubModal, setConfirmSubModal] = useState(false);
    const router = useRouter();
    const { id } = useParams();
    const [arrayOfFeatures, setArrayOfFeatures] = useState([]);
    const [graphDdata, setGraphDdata] = useState([]);
    
    const colors = ['#09ceb2', '#0b93ce', '#0a4dce', '#610bce'];

    // Aggregates feature percentages by name to avoid duplicates
    const mergeFeaturesByName = (data) => {
        const featureMap = {};
    
        data.forEach((plan) => {
            plan.features.forEach((feature) => {
                if (featureMap[feature.name]) {
                    featureMap[feature.name].totalValue += feature.percentage;
                    featureMap[feature.name].count += 1;
                } else {
                    featureMap[feature.name] = {
                        name: feature.name,
                        totalValue: feature.percentage,
                        count: 1,
                        color: colors[Object.keys(featureMap).length % colors.length],
                    };
                }
            });
        });
    
        // Convert to array and calculate mean for each feature
        return Object.values(featureMap).map((feature) => ({
            name: feature.name,
            value: feature.totalValue / feature.count, // Calculate mean value
            color: feature.color,
        }));
    };
    

    async function getMetricInfo() {
        console.log("Fetching feature metric for id:", id);
        
        try {
            const response = await fetch(`https://go-tru-hub-api.onrender.com/organizations/feature-matric/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            const data = await response.json();
            console.log(data.data.result);
            
            const mergedData = mergeFeaturesByName(data.data.result); // Merges duplicate features
            setGraphDdata(mergedData);
            console.log("Merged data for PieChart:", mergedData);

        } catch (error) {
            console.error('Error fetching feature metric:', error);
        }
    }

    async function getOrgInfo() {
        console.log("Fetching feature metric for id:", id);
        
        try {
            const response = await fetch(`https://go-tru-hub-api.onrender.com/organizations/users-summary/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            const data = await response.json();
            console.log("Summary Data ====> ", data.data);
            setOrgInfo(data.data)

        } catch (error) {
            console.error('Error fetching feature metric:', error);
        }
    }

    async function getActivePlans() {
        const res = await fetch(`https://go-tru-hub-api.onrender.com/organizations/active-plans/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            }
        });
        const data = await res.json();
        // setArrayOfFeatures(data.data);
        console.log(data);
    }

    // async function getActivePlans() {
    //     const res = await fetch(`https://go-tru-hub-api.onrender.com/organizations/users-summary/${id}`, {
    //         headers: {
    //             Authorization: `Bearer ${Cookies.get("token")}`,
    //         }
    //     });
    //     const data = await res.json();
    //     // setArrayOfFeatures(data.data);
    //     console.log(data);
    // }

    useEffect(() => {
        getOrgInfo();
        getMetricInfo();
        getSubs();
        getActivePlans()
    }, []);

    // async function getOrgInfo(){
    //     // Fetch organization info here if needed
    // }

    async function getSubs() {
        const res = await fetch(`https://go-tru-hub-api.onrender.com/subscriptions`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            }
        });
        const data = await res.json();
        setArrayOfFeatures(data.data);
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
                            <p className="text-[28px] text-primary-color font-[600]">{orgInfo?.organization?.nameOfEstablishment}</p>
                            {/* <p className='text-[#828282]'>Your current pricing system is set to,</p> */}
                        </div>
                        <div className='flex gap-3'>
                            <Link href={`/manage-users/${id}/contract`} className='bg-[#1E2522] px-4 rounded-[6px] py-3 text-[#fff]'>Contract Plan</Link>
                            <Link href={`/manage-users/${id}/monitor-source`} className='bg-[#1E2522] px-4 rounded-[6px] py-3 text-[#fff]'>Contract Source</Link>
                        </div>
                    </div>
                </div>
                <div className='px-[10px] md:px-[30px]'>
                    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                    {/* Logo Section */}
                        <div className="flex-shrink-0">
                            <img
                            src="https://via.placeholder.com/150" // Replace this with actual logo URL
                            alt="Institution Logo"
                            className="w-32 h-32 rounded-lg object-cover"
                            />
                        </div>

                        {/* Institution Data */}
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-4">Institution data</h2>
                            <div className="grid gap-4">
                                <div className='flex items-center justify-between'>
                                    <p><strong>Institution name:</strong></p>
                                    <p>{orgInfo?.organization?.nameOfEstablishment}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p><strong>Proprietor name:</strong></p>
                                    <p>{orgInfo?.organization?.nameOfProprietor === "" ? "N/A" : orgInfo?.organization?.nameOfProprietor}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p><strong>Type:</strong></p>
                                    <p>{orgInfo?.organization?.bizType}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p><strong>Email:</strong></p>
                                    <p>{orgInfo?.organization?.email}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p><strong>Phone number:</strong></p>
                                    <p>{orgInfo?.organization?.phone}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p><strong>Year of establishment:</strong></p>
                                    <p>{orgInfo?.organization?.yearOfEstablishment}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p><strong>Address:</strong></p>
                                    <p>{orgInfo?.organization?.businessAddress}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p><strong>Joined:</strong></p>
                                    <p>{ new Date(orgInfo?.organization?.createdAt).toDateString() }</p>
                                </div>
                            </div>

                            {/* Documents Section */}
                            {/* <div className="mt-6 space-y-4">
                                <div className="flex items-center space-x-2">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">Name of document.pdf</p>
                                        <p className="text-gray-500 text-sm">11 Sep, 2023 | 12:24pm | 13MB</p>
                                    </div>
                                    <FaDownload className="text-gray-500 cursor-pointer" />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">Name of document.pdf</p>
                                        <p className="text-gray-500 text-sm">11 Sep, 2023 | 12:24pm | 13MB</p>
                                    </div>
                                    <FaDownload className="text-gray-500 cursor-pointer" />
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-5 py-5 rounded-[12px]">
                        <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#4F4F4F] font-[600]">Total subscription </p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/buildings.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-text-color text-[24px]">#{orgInfo?.totalSubscription?.toLocaleString()}</p>
                        </div>

                        <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#4F4F4F] font-[600]">Active subscription</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/card-tick.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-text-color text-[24px]">#{orgInfo?.totalActiveSubscription?.toLocaleString()}</p>
                        </div>

                        <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#4F4F4F] font-[600]">Total subscription</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/card-tick.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-text-color text-[24px]">#{orgInfo?.totalSubscription?.toLocaleString()}</p>
                        </div>

                        <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#4F4F4F] font-[600]">Total Monitor Source</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/card-tick.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-text-color text-[24px]">#{orgInfo?.totalMonitorSource?.toLocaleString()}</p>
                        </div>

                        <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#4F4F4F] font-[600]">Total Guardians</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/card-tick.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-text-color text-[24px]">{orgInfo?.totalGuardian}</p>
                        </div>
                        <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#4F4F4F] font-[600]">Total Staffs</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/card-tick.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-text-color text-[24px]">{orgInfo?.totalStaffs}</p>
                        </div>
                        <div className="bg-[#F7F7F7] p-3 rounded-[20px]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-[#4F4F4F] font-[600]">Total Students</p>
                                <div className='bg-[#23AEAE] p-2 rounded-full'>
                                    <img src="./images/card-tick.svg" alt="" />
                                </div>
                            </div>
                            <p className="font-[600] text-text-color text-[24px]">{orgInfo?.totalStudents}</p>
                        </div>
                    </div>

                    <div className='flex gap-5'>
                        <div className='w-[100%] shadow-md rounded-[6px] p-[20px] mt-10'>
                            <p className='text-[#1D1D1D] text-[18px] font-[600] mb-5'>Monitor Source Duration</p>
                            <div className='w-full'>
                                Days Remaining: <span className='text-[#0A4DCE] font-[600]'>{orgInfo?.monitorSourceDuration?.daysRemaining} days</span>
                            </div>
                            <div className='w-full mt-3'>
                                End Date: <span className='text-[#0A4DCE] font-[600]'>{ new Date(orgInfo?.monitorSourceDuration?.endDate).toDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-5'>
                        <div className='w-[100%] shadow-md rounded-[6px] p-[20px] mt-10'>
                            <p className='text-[#1D1D1D] text-[18px] font-[600] mb-5'>Feature usage metric</p>
                            <div className='w-full'>
                                {/* <Doughnut data={data} /> */}
                                <PieChart width={220} height={220}>
                                        <Pie
                                            data={graphDdata}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={90}
                                            outerRadius={110}
                                            fill="#8884d8"
                                            paddingAngle={0}
                                            dataKey="value"
                                        >
                                            {graphDdata?.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                            </div>
                            <div className='flex items-center gap-[3rem] mt-5'>
                                {
                                    graphDdata.map((entry, index) => (
                                        <div className="flex items-center mb-4" key={index}>
                                            <div
                                                className={`w-4 h-8 mr-2 rounded-full bg-[${entry.color}]`}
                                                style={{ width: `3px` }}
                                            />
                                            <div className='grid text-[14px]'>
                                                <span className='capitalize'>{entry.name}</span>
                                                <span>{entry.value.toFixed(4)}%</span>
                                            </div>
                                        </div>
                                    ))
                                }
                                {/* <div className="flex items-center mb-4">
                                    <div
                                        className={`w-4 h-8 mr-2 rounded-full bg-[#0b93ce]`}
                                        style={{ width: `3px` }}
                                    />
                                    <div className='grid text-[14px]'>
                                        <span>Monitor</span>
                                        <span>70%</span>
                                    </div>
                                </div>
                                <div className="flex items-center mb-4">
                                    <div
                                        className={`w-4 h-8 mr-2 rounded-full bg-[#0a4dce]`}
                                        style={{ width: `3px` }}
                                    />
                                    <div className='grid text-[14px]'>
                                        <span>Trade</span>
                                        <span>70%</span>
                                    </div>
                                </div>
                                <div className="flex items-center mb-4">
                                    <div
                                        className={`w-4 h-8 mr-2 rounded-full bg-[#610bce]`}
                                        style={{ width: `3px` }}
                                    />
                                    <div className='grid text-[14px]'>
                                        <span>Result</span>
                                        <span>70%</span>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className='w-[70%]'>
                            <div className='w-[100%] shadow-md rounded-[6px] p-[20px] mt-10'>
                                <p>Subscription history</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    </div>
  )
}

export default ManageUserInfo
