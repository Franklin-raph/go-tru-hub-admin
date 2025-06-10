"use client"

import React, { useEffect, useState } from 'react'
import SideNav from '../components/side-nav/SideNav'
import TopNav from '../components/top-nav/TopNav'
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

const ContractPlan = () => {
    const [contractPlans, setContractPlans] = useState([]);
    const [page, setPage] = useState(1); // State to keep track of the current page
    const [totalPages, setTotalPages] = useState(1); // State for total pages from API
    const router = useRouter();

    async function getAllContractPlans(currentPage = 1){
        console.log(currentPage);
        
        try {
            const response = await fetch(`https://go-tru-hub-api.onrender.com/contract-plan/all-plans?page=${currentPage}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });
            const data = await response.json();
            setContractPlans(data.data);
            setTotalPages(data.totalPages || 1); // Assuming totalPages is returned from the API

            console.log('Data:', data);
            console.log('Total Pages:', data.totalPages); // Log total pages for debugging
            
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getAllContractPlans(page);
    }, [page]); // Refetch when page changes

    // Function to go to the next page
    const handleNextPage = () => {
        // if (page < totalPages) {
        // }
        setPage(prevPage => prevPage + 1);
        console.log(page);
    };

    // Function to go to the previous page
    const handlePreviousPage = () => {
        console.log(page);
        
        setPage(prevPage => prevPage - 1);
        // if (page > 1) {
        // }
    };

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
                        </div>
                        {/* <div className="flex items-center gap-3">
                            <button className="bg-[#2D3934] text-white px-4 py-3 rounded-[8px] font-[600] text-[14px]">Create Feature</button>
                        </div> */}
                    </div>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-left">
                        <thead className="text-[14px] border-b">
                            <tr>
                                <th scope="col" className="px-6 py-3 th1 font-[700]">S/N</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Org. name</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Amount</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Payment Status</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Plan Validity</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Contract Status</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Quantity</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Quantity Left</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contractPlans && contractPlans?.plans?.map((plan, index) => {
                                    return(
                                        <tr className='cursor-pointer' style={{borderBottom:"1px solid #dcdcdc"}} key={index} onClick={() => router.replace(`/contract-plan/${plan._id}`)} >
                                            <td className="px-6 text-center py-4">{index +1}</td>
                                            <td className="px-6 text-center py-4">{plan?.Organization?.nameOfEstablishment}</td>
                                            <td className="px-6 text-center py-4">{plan?.amount}</td>
                                            <td className="px-6 text-center py-4">{plan?.paidStatus.toString()}</td>
                                            <td className="px-6 text-center py-4">{plan?.planValidity}</td>
                                            {
                                                plan?.isContract === true ?  <td className="text-center px-6 py-4 text-green-500 rounded-[4px]">Active</td>
                                                :
                                                <td className="px-6 py-4 text-red-500 text-center rounded-[4px]">Inactive</td>
                                            }
                                            <td className="px-6 text-center py-4">{plan?.quantity}</td>
                                            <td className="px-6 text-center py-4">{plan?.quantityLeft}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                {/* Pagination buttons */}
                <div className="flex justify-end items-center gap-4 mt-4 px-5 pb-10">
                    <button
                        className="py-2 px-4 rounded bg-secondary-color text-white"
                        onClick={handlePreviousPage}
                    >
                        Previous
                    </button>
                    <p>Page { contractPlans?.pagination?.currentPage } of { contractPlans?.pagination?.totalPages } </p>
                    <button
                        className="py-2 px-4 rounded bg-secondary-color text-white"
                        onClick={handleNextPage}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    </div>
  )
}

export default ContractPlan;
