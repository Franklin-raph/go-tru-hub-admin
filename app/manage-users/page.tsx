"use client";

import React, { useState } from "react";
import SideNav from '../components/side-nav/SideNav';
import TopNav from '../components/top-nav/TopNav';
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/utils/Axios-interceptors";
import { IoCloseOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import BtnLoader from "../components/btn-Loader/BtnLoader";

const ManageUsersComponents = () => {
  const router = useRouter();
  const [bizType, setBizType] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [deactivateAcct, setDeactivateAcct] = useState<string>("");
  const [activateAcct, setActivateAcct] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [deleteOrgs, setDeleteOrgs] = useState<string>("");
  const [viewDropdown, setViewDropdown] = useState<string | null>(null); // Track dropdown for each user

  // Fetch all users without filters
  const getAllUsers = async () => {
    const { data } = await api.get(`/organizations`);
    console.log(data);
    
    return data.data;
  };

  // Fetch users with applied filters
  const applyFilter = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://test.yamltech.com/organizations?bizType=${bizType}&filter=${year}&activeStatus=${status}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const data = await res.json();
      setLoading(false);
      setFilteredUsers(data.data);
    } catch (error) {
      console.error("Failed to apply filter", error);
      setLoading(false);
    }
  };

  // Destructure refetch from useQuery
  const {
    data: allUsers,
    isLoading: subLoading,
    refetch,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: getAllUsers,
  });

  // Function to deactivate an account
  async function deactivateAcctFn(id: string) {
    setLoading(true);
    const res = await fetch(
      `https://test.yamltech.com/organizations/deactivate-acccount/${id}?status=false`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setDeactivateAcct("");
      refetch();
      alert(data.message);
    }
  }


  // Function to deactivate an account
  async function deleteAcctFn(id: string) {
    setLoading(true);
    const res = await fetch(
      `https://test.yamltech.com/organizations/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    const data = await res.json();
    console.log(data);
    
    setLoading(false);
    if (res.ok) {
      setDeleteOrgs("");
      refetch();
      alert(data.message);
    }
  }

  // Function to activate an account
  async function activateAcctFn(id: string) {
    setLoading(true);
    const res = await fetch(
      `https://test.yamltech.com/organizations/deactivate-acccount/${id}?status=true`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setActivateAcct("");
      refetch();
      alert(data.message);
    }
  }

  // Toggle dropdown for each row
  const toggleDropdown = (id: string) => {
    setViewDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <>
        <SideNav />
        <div className="w-[78%] ml-auto h-[100dvh]">
          <TopNav />
          <div className="flex items-center justify-between mb-[1rem] px-[30px] py-[1rem] bg-[#F2FCF7]">
            <p className="text-[28px] text-primary-color font-[600]">
              Manage users
            </p>
            <div className="flex gap-4">
              <select
                className="bg-white text-[#2D3934] px-4 py-3 rounded-[8px] text-[14px] flex items-center gap-2 font-[600] cursor-pointer outline-none"
                value={bizType}
                onChange={(e) => setBizType(e.target.value)}
              >
                <option value="">--Select Institution Type--</option>
                <option value="primary">Primary Institution</option>
                <option value="secondary">Secondary Institution</option>
                <option value="tertiary">Tertiary Institution</option>
              </select>

              <select
                className="bg-white text-[#2D3934] px-4 py-3 rounded-[8px] text-[14px] flex items-center gap-2 font-[600] cursor-pointer outline-none"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">--Select Duration--</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="thisYear">This Year</option>
              </select>

              <select
                className="bg-white text-[#2D3934] px-4 py-3 rounded-[8px] text-[14px] flex items-center gap-2 font-[600] cursor-pointer outline-none"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">--Select Status--</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <button
                className="bg-primary-color text-white px-4 py-2 rounded-[8px] text-[14px] font-[600]"
                onClick={applyFilter}
              >
                Apply Filter
              </button>
            </div>
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-left">
              <thead className="text-[14px] border-b">
                <tr>
                  <th scope="col" className="px-6 py-3 th1 font-[700]">
                    S/N
                  </th>
                  <th scope="col" className="px-6 py-3 font-[700]">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 font-[700]">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 font-[700]">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3 font-[700]">
                    Is Active
                  </th>
                  <th scope="col" className="px-6 py-3 font-[700]">
                    Date Joined
                  </th>
                  <th scope="col" className="px-6 py-3 font-[700]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {(filteredUsers.length > 0 ? filteredUsers : allUsers)?.map(
                  (user: any, index: number) => (
                    <tr
                      style={{ borderBottom: "1px solid #dcdcdc" }}
                      key={index}
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{user.nameOfEstablishment}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.phone}</td>
                      <td className="px-6 py-4">{user.isActive.toString()}</td>
                      <td className="px-6 py-4">{`${user.createdAt}`.slice(0, 10)}</td>
                      <td className="relative">
                        <button
                          className="border border-gray-600 rounded-[4px] px-3 py-[6px] text-[12px]"
                          onClick={() => toggleDropdown(user._id)}
                        >
                          View
                        </button>
                        {viewDropdown === user._id && (
                          <div className="absolute bg-white border rounded shadow-lg mt-2 p-2 z-10">
                            {user.isActive ? (
                              <>
                                <button
                                  className="block w-full text-left border border-red-300 rounded-[4px] px-3 py-[6px] text-[12px]"
                                  onClick={() => setDeactivateAcct(user._id)}
                                >
                                  Deactivate Account
                                </button>
                                <button
                                  className="block w-full text-left border border-red-300 rounded-[4px] px-3 py-[6px] text-[12px]"
                                  onClick={() => setDeleteOrgs(user._id)}
                                >
                                  Delete Account
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="block w-full text-left border border-green-300 rounded-[4px] px-3 py-[6px] text-[12px]"
                                  onClick={() => setActivateAcct(user._id)}
                                >
                                  Activate Account
                                </button>
                                <button
                                  className="block w-full text-left border border-red-300 rounded-[4px] px-3 py-[6px] text-[12px]"
                                  onClick={() => setDeleteOrgs(user._id)}
                                >
                                  Delete Account
                                </button>
                              </>
                            )}
                            <button
                              className="block w-full text-left border border-gray-600 rounded-[4px] px-3 py-[6px] text-[12px] mt-2"
                              onClick={() => router.replace(`manage-users/${user._id}`)}
                            >
                              View
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
      {
        deactivateAcct &&
        <>
          <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeactivateAcct('')}></div>
          <div className="bg-white w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
              <div className="flex items-center justify-between border-b pb-[5px]">
                  <p className="text-[22px]">Deactivate Account</p>
                  <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setDeactivateAcct('')}/>
              </div>
              <div className='text-center flex items-center justify-center flex-col'>
                  <img src="./images/logout-question.svg" alt="" className='mt-9'/>
                  <div className='my-5'>
                      <p className='text-[#19201D] mb-4'>Deactivate Account</p>
                      <p className='text-[#828282] text-[14px]'>
                          Are you sure, you want to deactivate this users account
                      </p>
                  </div>
                  <div className='flex items-center gap-5 mt-3 pb-5'>
                      <button className='border-[#19201D] border px-5 py-2 rounded-[4px] text-[14px]' onClick={() => setDeactivateAcct('')}>No</button>
                      <button className='bg-[#9A2525] text-white px-5 py-2 rounded-[4px] text-[14px]' onClick={() => {
                          deactivateAcctFn(deactivateAcct)
                      }} >Yes, Continue</button>
                  </div>
              </div>
          </div>
        </>
      }

      {
        deleteOrgs &&
        <>
          <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeleteOrgs('')}></div>
          <div className="bg-white w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
              <div className="flex items-center justify-between border-b pb-[5px]">
                  <p className="text-[22px]">Delete Account</p>
                  <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setDeleteOrgs('')}/>
              </div>
              <div className='text-center flex items-center justify-center flex-col'>
                  <img src="./images/logout-question.svg" alt="" className='mt-9'/>
                  <div className='my-5'>
                      <p className='text-[#19201D] mb-4'>Delete Account</p>
                      <p className='text-[#828282] text-[14px]'>
                          Are you sure, you want to delete this organization's account?
                      </p>
                  </div>
                  <div className='flex items-center gap-5 mt-3 pb-5'>
                      <button className='border-[#19201D] border px-5 py-2 rounded-[4px] text-[14px]' onClick={() => setDeleteOrgs('')}>No</button>
                      <button className='bg-[#9A2525] text-white px-5 py-2 rounded-[4px] text-[14px]' onClick={() => {
                          deleteAcctFn(deleteOrgs)
                      }} >Yes, Continue</button>
                  </div>
              </div>
          </div>
        </>
      }
      
      {
        activateAcct &&
        <>
          <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setActivateAcct('')}></div>
          <div className="bg-white w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
              <div className="flex items-center justify-between border-b pb-[5px]">
                  <p className="text-[22px]">Activate Account</p>
                  <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setActivateAcct('')}/>
              </div>
              <div className='text-center flex items-center justify-center flex-col'>
                  <img src="./images/logout-question.svg" alt="" className='mt-9'/>
                  <div className='my-5'>
                      <p className='text-[#19201D] mb-4'>Activate Account</p>
                      <p className='text-[#828282] text-[14px]'>
                          Are you sure, you want to activate this users account
                      </p>
                  </div>
                  <div className='flex items-center gap-5 mt-3 pb-5'>
                      <button className='border-[#19201D] border px-5 py-2 rounded-[4px] text-[14px]' onClick={() => setActivateAcct('')}>No</button>
                      <button className='bg-[#23b94b] text-white px-5 py-2 rounded-[4px] text-[14px]' onClick={() => {
                          activateAcctFn(activateAcct)
                      }} >Yes, Continue</button>
                  </div>
              </div>
          </div>
        </>
      }
    </div>
  );
};

export default ManageUsersComponents;
