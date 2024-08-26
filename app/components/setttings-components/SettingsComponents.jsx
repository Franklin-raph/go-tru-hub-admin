"use client"

import React, { useState } from 'react';
import SideNav from '../side-nav/SideNav';
import TopNav from '../top-nav/TopNav';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import BtnLoader from '../btn-Loader/BtnLoader';

const SettingsComponents = () => {
    const router = useRouter();

    const [encrypted, setEncrypted] = useState(true);

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm();

    const [loading, setLoading] = useState(false);

    async function handleAdminPasswordReset(values) {
        const newPassword = watch('newPassword');

        console.log(values);
        setLoading(true);
        const res = await fetch(`https://test.yamltech.com/admin/dashboard/change-password`, {
            method: "POST",
            body: JSON.stringify({ oldPassword: values.oldPassword, newPassword: values.newPassword }),
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${Cookies.get('token')}`
            },
            signal: AbortSignal.timeout(10000)
        });

        if (res) setLoading(false);
        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            setLoading(false);
            return;
        }

        if (res.ok) {
            console.log(data.data);
            alert(data.message);
        }

        console.log(res, data.data);
        reset();
    }

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
                            <form onSubmit={handleSubmit(handleAdminPasswordReset)}>
                                <div className='flex items-center gap-5'>
                                    <div className="w-full" style={{ marginBottom: "30px" }}>
                                        <p style={{ marginBottom: "5px" }}>Current Password</p>
                                        <div className="border w-full rounded-[4px] flex items-center justify-between px-4 py-3">
                                            <input
                                                className='w-full text-[#19201d] outline-none bg-transparent'
                                                type={encrypted ? "password" : "text"}
                                                placeholder="Current password"
                                                {...register('oldPassword', {
                                                    required: 'Password is required'
                                                })}
                                            />
                                            <div>
                                                {!encrypted ? (
                                                    <img src="./images/see.svg" onClick={() => setEncrypted(!encrypted)} className='cursor-pointer' />
                                                ) : (
                                                    <img src="./images/encrypt.svg" onClick={() => setEncrypted(!encrypted)} className='cursor-pointer' />
                                                )}
                                            </div>
                                        </div>
                                        {errors?.oldPassword && <p className="text-red-500">{errors.oldPassword.message}</p>}
                                    </div>
                                    <div className="w-full" style={{ marginBottom: "30px" }}>
                                        <p style={{ marginBottom: "5px" }}>New Password</p>
                                        <div className="border w-full rounded-[4px] flex items-center justify-between px-4 py-3">
                                            <input
                                                className='w-full text-[#19201d] outline-none bg-transparent'
                                                type={encrypted ? "password" : "text"}
                                                placeholder="New password"
                                                {...register('newPassword', {
                                                    required: 'Password is required'
                                                })}
                                            />
                                            <div>
                                                {!encrypted ? (
                                                    <img src="./images/see.svg" onClick={() => setEncrypted(!encrypted)} className='cursor-pointer' />
                                                ) : (
                                                    <img src="./images/encrypt.svg" onClick={() => setEncrypted(!encrypted)} className='cursor-pointer' />
                                                )}
                                            </div>
                                        </div>
                                        {errors?.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
                                    </div>
                                </div>

                                <div className='flex items-end gap-5'>
                                    <div className="w-full" style={{ marginBottom: "30px" }}>
                                        <p style={{ marginBottom: "5px" }}>Re-enter Password</p>
                                        <div className="border w-full rounded-[4px] flex items-center justify-between px-4 py-3">
                                            <input
                                                className='w-full text-[#19201d] outline-none bg-transparent'
                                                type={encrypted ? "password" : "text"}
                                                placeholder="Re-enter password"
                                                {...register('confirmPassword', {
                                                    required: 'Password confirmation is required',
                                                    validate: value =>
                                                        value === newPassword || 'Passwords do not match'
                                                })}
                                            />
                                            <div>
                                                {!encrypted ? (
                                                    <img src="./images/see.svg" onClick={() => setEncrypted(!encrypted)} className='cursor-pointer' />
                                                ) : (
                                                    <img src="./images/encrypt.svg" onClick={() => setEncrypted(!encrypted)} className='cursor-pointer' />
                                                )}
                                            </div>
                                        </div>
                                        {errors?.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                                    </div>
                                    <div className="w-full" style={{ marginBottom: "30px" }}>
                                        {loading ? <BtnLoader /> : (
                                            <button
                                                type="submit"
                                                className="bg-[#19201D] w-full text-white py-3 px-4 rounded"
                                            >
                                                Update password
                                            </button>
                                        )}
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
                                    <div className="w-full" style={{ marginBottom: "30px" }}>
                                        <p style={{ marginBottom: "5px" }}>Title</p>
                                        <div className="border w-full rounded-[4px] flex items-center justify-between px-4 py-3">
                                            <input
                                                className='w-full text-[#19201d] outline-none bg-transparent'
                                                type="text"
                                                placeholder="e.g Change in subscription pricing"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full" style={{ marginBottom: "30px" }}>
                                        <p style={{ marginBottom: "5px" }}>Announcement</p>
                                        <div className="border w-full rounded-[4px] flex items-center justify-between">
                                            <textarea className='bg-transparent w-full resize-none p-3 outline-none h-[150px]'></textarea>
                                        </div>
                                    </div>
                                    <div className="w-full" style={{ marginBottom: "30px" }}>
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
        </div>
    );
};

export default SettingsComponents;
