import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[100vh] w-[30%] mx-auto'>
        <p className='font-[600] mb-5 text-[20px]'>Gotruhub Admin Login</p>
        <div className='w-full'>
            <div>
                <label className='block mb-2'>Email</label>
                <input type='text' placeholder='johndoe@gmail.com' className="border rounded-[6px] outline-none w-full placeholder:text-[#B6B6B6] px-4 py-2"/>
            </div>
            <div className='w-full mt-5'>
                <label className='block mb-2'>Password</label>
                <input type='password' placeholder='****' className="border rounded-[6px] outline-none w-full placeholder:text-[#B6B6B6] px-4 py-2"/>
            </div>
            <button className='bg-green-500 w-full mt-3 py-2 rounded-[4px] text-white'>Login</button>
        </div>
    </div>
  )
}

export default page