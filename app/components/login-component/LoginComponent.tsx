"use client"

import React, { useEffect, useState } from 'react'
import BtnLoader from '../btn-Loader/BtnLoader'
import { useRouter } from 'next/navigation'
import { FieldValues, useForm } from 'react-hook-form'
import Cookies from 'js-cookie';


const LoginComponent = () => {

  const { register, 
          handleSubmit, 
          formState: { errors, isSubmitting },
          reset,
          getValues
        } = useForm()

    // const [email, setEmail] = useState<String>('')
    // const [password, setPassword] = useState<String>('')
    const [loading, setLoading] = useState<Boolean>(false)
    const router = useRouter()

    async function handleAdminLogin(values: FieldValues) {
      console.log(JSON.stringify({values}));
      
      setLoading(true)
      const res = await fetch(`https://test.yamltech.com/login/organization`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { 
          "Content-type": "application/json" 
        },
        signal: AbortSignal.timeout(10000)
      })
      if(res) setLoading(false)
      const data = await res.json()
      if(!res.ok){
        alert(data.message)
        setLoading(false)
        return
      }
      if(res.ok){
        console.log(data.data);
        
        Cookies.set('token', data.data.access_token);
        // localStorage.setItem('admin', JSON.stringify(data.data))
        router.push('/dashboard')
      }
      console.log(res, data.data);
      reset()
      
        // console.log({email, password});
    }
    
  return (
    <div className='flex flex-col items-center justify-center h-[100vh] w-[30%] mx-auto'>
      <p className='font-[600] mb-5 text-[20px]'>Gotruhub Admin Login</p>
      <form className='w-full' onSubmit={handleSubmit(handleAdminLogin)} >
        <div>
          <label className='block mb-2'>Email</label>
          <input 
              type='text'
              {...register('email', {
                required:'Email is required'
              })}
              placeholder='johndoe@gmail.com'
              className="border rounded-[6px] outline-none w-full placeholder:text-[#B6B6B6] px-4 py-2"
          />
          {
            errors.email && <p className='text-red-500  text-[14px]'>{`${errors.email.message}`}</p>
          }
        </div>
        <div className='w-full mt-5'>
          <label className='block mb-2'>Password</label>
          <input 
              type='password'
              {...register('password', {
                required:'Password is required'
              })}
              placeholder='****'
              className="border rounded-[6px] outline-none w-full placeholder:text-[#B6B6B6] px-4 py-2"
          />
          {
            errors.password && <p className='text-red-500 text-[14px]'>{`${errors.password.message}`}</p>
          }
        </div>
        {
          loading ?
          <BtnLoader />
          :
          <button type='submit' disabled={isSubmitting} className='bg-primary-color w-full mt-7 py-2 rounded-[4px] text-white'>Login</button>
        }
      </form>
    </div>
  )
}

export default LoginComponent