"use client";

import React, { useState, useEffect } from "react";
import SideNav from "../side-nav/SideNav";
import TopNav from "../top-nav/TopNav";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/utils/Axios-interceptors";
import { IoCloseOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import BtnLoader from "../btn-Loader/BtnLoader";

const ManageUsersComponents = () => {
  const router = useRouter();
  const [bizType, setBizType] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [deactivateAcct, setDeactivateAcct] = useState<string>("");
  const [activateAcct, setActivateAcct] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]); // State to store filtered users

  // Fetch all users without filters
  const getAllUsers = async () => {
    const { data } = await api.get(`/organizations`);
    console.log(data);
    return data.data;
  };

  // Fetch users with applied filters
  const applyFilter = async () => {
    console.log(`https://go-tru-hub-api.onrender.com/organizations?bizType=${bizType}&filter=${year}&activeStatus=${status}`);
    
    try {
      setLoading(true);
      const res = await fetch(
        `https://go-tru-hub-api.onrender.com/organizations?bizType=${bizType}&filter=${year}&activeStatus=${status}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const data = await res.json();
      setLoading(false);
      setFilteredUsers(data.data); // Set the filtered data to state
      console.log(res, data);
    } catch (error) {
      console.error("Failed to apply filter", error);
      setLoading(false);
    }
  };

  // Destructure refetch from useQuery
  const {
    data: allUsers,
    isLoading: subLoading,
    isError: subError,
    refetch,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: getAllUsers,
  });

  // Function to deactivate an account
  async function deactivateAcctFn(id: string) {
    console.log(
      `https://go-tru-hub-api.onrender.com/organizations/deactivate-acccount/${id}?status=false`
    );
    setLoading(true);
    const res = await fetch(
      `https://go-tru-hub-api.onrender.com/organizations/deactivate-acccount/${id}?status=false`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    const data = await res.json();
    if (res) setLoading(false);
    if (res.ok) {
      setDeactivateAcct("");
      refetch();
      alert(data.message);
    }
    console.log(res, data);
  }

  // Function to activate an account
  async function activateAcctFn(id: string) {
    console.log(
      `https://go-tru-hub-api.onrender.com/organizations/deactivate-acccount/${id}?status=true`
    );
    setLoading(true);
    const res = await fetch(
      `https://go-tru-hub-api.onrender.com/organizations/deactivate-acccount/${id}?status=true`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    const data = await res.json();
    if (res) setLoading(false);
    if (res.ok) {
      setActivateAcct("");
      refetch();
      alert(data.message);
    }
    console.log(res, data);
  }

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
                      <td className="px-6 py-4">{`${user.createdAt}`.slice(
                        0,
                        10
                      )}</td>
                      {user?.isActive === true ? (
                        <td
                          className="px-6 py-4"
                          onClick={() => setDeactivateAcct(user._id)}
                        >
                          <button className="border border-red-300 rounded-[4px] px-3 py-[6px] text-[12px]">
                            Deactivate Account
                          </button>
                        </td>
                      ) : (
                        <td
                          className="px-6 py-4"
                          onClick={() => setActivateAcct(user._id)}
                        >
                          <button className="border border-green-300 rounded-[4px] px-3 py-[6px] text-[12px]">
                            Activate Account
                          </button>
                        </td>
                      )}
                      <td>
                        <button className="border border-gray-600 rounded-[4px] px-3 py-[6px] text-[12px]" onClick={() => router.replace(`manage-users-component/${user._id}`)} >Contract</button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
      {deactivateAcct && (
        <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-[350px]">
            <div className="flex justify-end mb-4">
              <IoCloseOutline
                className="cursor-pointer text-[24px]"
                onClick={() => setDeactivateAcct("")}
              />
            </div>
            <p className="text-center text-[18px] font-[500] mb-4">
              Are you sure you want to deactivate this account?
            </p>
            <div className="flex gap-4 justify-between">
              <button
                className="w-full bg-primary-color text-white py-2 px-4 rounded-[8px]"
                onClick={() => deactivateAcctFn(deactivateAcct)}
              >
                {loading ? <BtnLoader /> : "Deactivate"}
              </button>
              <button
                className="w-full border border-primary-color text-primary-color py-2 px-4 rounded-[8px]"
                onClick={() => setDeactivateAcct("")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {activateAcct && (
        <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-[350px]">
            <div className="flex justify-end mb-4">
              <IoCloseOutline
                className="cursor-pointer text-[24px]"
                onClick={() => setActivateAcct("")}
              />
            </div>
            <p className="text-center text-[18px] font-[500] mb-4">
              Are you sure you want to activate this account?
            </p>
            <div className="flex gap-4 justify-between">
              <button
                className="w-full bg-primary-color text-white py-2 px-4 rounded-[8px]"
                onClick={() => activateAcctFn(activateAcct)}
              >
                {loading ? <BtnLoader /> : "Activate"}
              </button>
              <button
                className="w-full border border-primary-color text-primary-color py-2 px-4 rounded-[8px]"
                onClick={() => setActivateAcct("")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsersComponents;
