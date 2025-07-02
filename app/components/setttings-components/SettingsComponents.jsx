"use client"

import React, { useState, useEffect } from 'react';
import SideNav from '../side-nav/SideNav';
import TopNav from '../top-nav/TopNav';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import BtnLoader from '../btn-Loader/BtnLoader';

const SettingsComponents = () => {
    const router = useRouter();

    const [encrypted, setEncrypted] = useState(true);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [email, setEmail] = useState(''); // Initialize as empty string
    const [isClient, setIsClient] = useState(false); // Track if we're on client side

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm();

    const [loading, setLoading] = useState(false);

    // Use useEffect to safely access localStorage
    useEffect(() => {
        setIsClient(true);
        // Only access localStorage after component mounts on client
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            try {
                setEmail(JSON.parse(storedEmail));
            } catch (error) {
                console.error('Error parsing email from localStorage:', error);
                setEmail('');
            }
        }
    }, []);

    async function handleAdminPasswordReset(values) {
        const newPassword = watch('newPassword');

        console.log(values);
        setLoading(true);
        
        try {
            const res = await fetch(`https://go-tru-hub-api.onrender.com/admin/dashboard/change-password`, {
                method: "POST",
                body: JSON.stringify({ oldPassword: values.oldPassword, newPassword: values.newPassword }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('token')}`
                },
                signal: AbortSignal.timeout(10000)
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            if (res.ok) {
                console.log(data.data);
                alert(data.message);
                reset();
            }

            console.log(res, data.data);
        } catch (error) {
            console.error('Error changing password:', error);
            alert('An error occurred while changing password');
        } finally {
            setLoading(false);
        }
    }

    async function sendAnnounncement() {
        if(!title || !content){
            alert("Title and content are required");
            return;
        }
        
        try {
            const res = await fetch('https://go-tru-hub-api.onrender.com/announcements',{
                method: 'POST',
                body: JSON.stringify({
                    title,
                    content
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                signal: AbortSignal.timeout(10000)
            });
            
            const data = await res.json();
            
            if(res.ok){
                alert("Announcement sent");
                setTitle('');
                setContent('');
            } else {
                alert("An error occurred, please try again");
            }
            console.log(res, data);
        } catch (error) {
            console.error('Error sending announcement:', error);
            alert("An error occurred, please try again");
        }
    }

    // Don't render until we're on the client side to avoid hydration mismatches
    if (!isClient) {
        return null; // or a loading spinner
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
                            <p className='font-[300] text-[14px]'>{email}</p>
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
                                                        value === watch('newPassword') || 'Passwords do not match'
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
                            <div>
                                <div className='flex flex-col items-center gap-5'>
                                    <div className="w-full" style={{ marginBottom: "30px" }}>
                                        <p style={{ marginBottom: "5px" }}>Title</p>
                                        <div className="border w-full rounded-[4px] flex items-center justify-between px-4 py-3">
                                            <input
                                                className='w-full text-[#19201d] outline-none bg-transparent'
                                                type="text"
                                                placeholder="Title"
                                                value={title}
                                                onChange={e => setTitle(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full" style={{ marginBottom: "30px" }}>
                                        <p style={{ marginBottom: "5px" }}>Announcement</p>
                                        <div className="border w-full rounded-[4px] flex items-center justify-between">
                                            <textarea 
                                                value={content}
                                                onChange={e => setContent(e.target.value)} 
                                                className='bg-transparent w-full resize-none p-3 outline-none h-[150px]'
                                                placeholder="Enter your announcement here..."
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full" style={{ marginBottom: "30px" }}>
                                        <button
                                            onClick={sendAnnounncement}
                                            className="bg-[#19201D] w-full text-white py-3 px-4 rounded"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default SettingsComponents;