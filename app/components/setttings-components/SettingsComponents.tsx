"use client"

import React, { useState } from 'react'
import SideNav from '../side-nav/SideNav'
import TopNav from '../top-nav/TopNav'
import { useRouter } from 'next/navigation'

const SettingsComponents = () => {

    const router = useRouter()

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [encrypted, setEncrypted] = useState(true);

  return (
    <div>
      <>
        <SideNav />
        <div className="w-[78%] ml-auto h-[100dvh]">
          <TopNav />
            <div className="bg-white">
              <div className="flex items-center justify-between px-[30px] py-[1rem] bg-[#F2FCF7]">
                <p className="text-[28px] text-primary-color font-[600]">Settings</p>
              </div>
              <div className="h-[284px] w-full flex items-center justify-center bg-[#262F56] flex-col text-white">
                <img src="./images/avatar.svg" className='w-[150px]' alt="" />
                <p className='font-[600] mb-1'>Adamu Garba Ignatius</p>
                <p className='font-[300] text-[14px]'>admin@gotruhub.com</p>
              </div>
            </div>
            <div className="flex justify-center items-center flex-col mt-[4rem]">
                <div className="bg-[#F7F7F7] px-8 py-6 w-[90%] rounded-[16px]">
                    <div className='mb-6'>
                        <div className='flex items-center gap-3'>
                            <img src="./images/shield.svg" alt="" />
                            <h2 className="text-xl text-[#19201D]">Password management</h2>
                        </div>
                        <p className='text-[#4F4F4F] mt-2'>Reset your password</p>
                    </div>
                    <form>
                        <div className='flex items-center gap-5'>
                            <div className="w-full" style={{marginBottom:"30px"}}>
                                <p style={{marginBottom:"5px"}}>Current Password</p>
                                <div className="border w-full rounded-[4px] flex items-center justify-between px-4 py-3">
                                    <input
                                        className='w-full text-[#19201d] outline-none bg-transparent'
                                        type={encrypted ? "password" : "text"}
                                        placeholder="New password"
                                        value={password}
                                        onChange={(e) => {
                                        setPassword(e.target.value);
                                        }}
                                    />
                                    <div>
                                        {!encrypted ? (
                                            <img src="./images/see.svg" onClick={()=> setEncrypted(!encrypted)} className='cursor-pointer' />
                                        ) : (
                                            <img src="./images/encrypt.svg" onClick={()=> setEncrypted(!encrypted)} className='cursor-pointer'  />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full" style={{marginBottom:"30px"}}>
                                <p style={{marginBottom:"5px"}}>New Password</p>
                                <div className="border w-full rounded-[4px] flex items-center justify-between px-4 py-3">
                                    <input
                                        className='w-full text-[#19201d] outline-none bg-transparent'
                                        type={encrypted ? "password" : "text"}
                                        placeholder="New password"
                                        value={password}
                                        onChange={(e) => {
                                        setPassword(e.target.value);
                                        }}
                                    />
                                    <div>
                                        {!encrypted ? (
                                            <img src="./images/see.svg" onClick={()=> setEncrypted(!encrypted)} className='cursor-pointer' />
                                        ) : (
                                            <img src="./images/encrypt.svg" onClick={()=> setEncrypted(!encrypted)} className='cursor-pointer'  />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-end gap-5'>
                            <div className="w-full" style={{marginBottom:"30px"}}>
                                <p style={{marginBottom:"5px"}}>Re-enter Password</p>
                                <div className="border w-full rounded-[4px] flex items-center justify-between px-4 py-3">
                                    <input
                                        className='w-full text-[#19201d] outline-none bg-transparent'
                                        type={encrypted ? "password" : "text"}
                                        placeholder="New password"
                                        value={password}
                                        onChange={(e) => {
                                        setPassword(e.target.value);
                                        }}
                                    />
                                    <div>
                                        {!encrypted ? (
                                            <img src="./images/see.svg" onClick={()=> setEncrypted(!encrypted)} className='cursor-pointer' />
                                        ) : (
                                            <img src="./images/encrypt.svg" onClick={()=> setEncrypted(!encrypted)} className='cursor-pointer'  />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full" style={{marginBottom:"30px"}}>
                                <button
                                    type="submit"
                                    className="bg-[#19201D] w-full text-white py-3 px-4 rounded"
                                    >
                                    Update password
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="bg-[#F7F7F7] mt-10 px-8 py-6 w-[90%] rounded-[16px]">
                    <div className='mb-6'>
                        <div className='flex items-center gap-3'>
                            <img src="./images/shield.svg" alt="" />
                            <h2 className="text-xl text-[#19201D]">Global announcements</h2>
                        </div>
                        <p className='text-[#4F4F4F] mt-2'>Send an announcement to all registered organizations</p>
                    </div>
                    <form>
                        <div className='flex flex-col items-center gap-5'>
                            <div className="w-full" style={{marginBottom:"30px"}}>
                                <p style={{marginBottom:"5px"}}>Title</p>
                                <div className="border w-full rounded-[4px] flex items-center justify-between px-4 py-3">
                                    <input
                                        className='w-full text-[#19201d] outline-none bg-transparent'
                                        type="text"
                                        placeholder="e.g Change in subscription pricing"
                                    />
                                </div>
                            </div>
                            <div className="w-full" style={{marginBottom:"30px"}}>
                                <p style={{marginBottom:"5px"}}>Announcement</p>
                                <div className="border w-full rounded-[4px] flex items-center justify-between">
                                    <textarea className='bg-transparent w-full resize-none p-3 outline-none h-[150px]'></textarea>
                                </div>
                            </div>
                            <div className="w-full" style={{marginBottom:"30px"}}>
                                <button
                                    type="submit"
                                    className="bg-[#19201D] w-full text-white py-3 px-4 rounded"
                                    >
                                    Send
                                </button>
                            </div>
                        </div>
                    </form>
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

export default SettingsComponents