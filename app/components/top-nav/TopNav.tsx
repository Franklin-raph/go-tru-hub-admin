"use client"

import React, { useState } from 'react'
import { IoNotificationsOutline } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Image, { ImageLoaderProps } from 'next/image';
import LogoutModal from '../logout-modal/LogoutModal';


const TopNav = () => {

  const [logoutModal, setLogoutModal] = useState<Boolean>(false)

  const router = useRouter()

  function logoutAdmin(){
    Cookies.remove('token')
    router.replace('/')
  }

  const imageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
  }

  return (
    <div className='bg-[#1D2522] flex items-center justify-between w-[100%] py-[1.2rem] top-0 right-0 z-[99] px-5'>
      <div className='flex items-center gap-5'>
      <Image
        loader={imageLoader}
        src="./images/admin-profile-icon.png"
        width={40}
        height={40}
        alt="Picture of the admin"
      />
        {/* <img src="" className='w-[40px] h-[40px] cursor-pointer' alt="" /> */}
        <div className='bg-[#C3FAE2] text-[20px] text-[#19201D] w-[40px] h-[40px] flex items-center justify-center cursor-pointer rounded-full'>
          <IoNotificationsOutline />
        </div>
        <div className='bg-[#C3FAE2] text-[20px] text-[#19201D] w-[40px] h-[40px] cursor-pointer flex items-center justify-center rounded-full'>
          <LuSettings2 />
        </div>
      </div>
      <div className='flex items-center gap-10'>
        <div className='flex items-center gap-3 bg-[#E7FDF4] rounded-[4px] pr-4 py-[5px] w-[300px]'>
          <input type="text" placeholder='Search the dashboard' className='text-[#242E2A] w-full placeholder:text-[#242E2A] bg-transparent text-[14px] outline-none px-4 py-[5px]' style={{ borderRight:'1px solid #242E2A4D' }}/>
          <CiSearch className='text-[#242E2A] cursor-pointer'/>
        </div>
        <div onClick={() => {
          setLogoutModal(true)
        }} className='text-[#19201D] flex items-center gap-3 bg-[#C3FAE2] py-[9px] px-[16px] rounded-[4px] cursor-pointer'>
          <IoIosLogOut fontSize={"20px"}/>
          <p>Logout</p>
        </div>
      </div>
      {
        logoutModal && <LogoutModal setLogoutModal={setLogoutModal} />
      }
    </div>
  )
}

export default TopNav