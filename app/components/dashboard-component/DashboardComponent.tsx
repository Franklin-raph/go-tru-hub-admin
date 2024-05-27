"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'js-cookie';

const DashboardComponent = () => {
  // /users/get-users/student

  const token = Cookies.get('token')

  const {data, isLoading, isError} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get('https://test.yamltech.com/users/get-users/student',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(data);
      
      return data
    }
  })

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <div>Sorry There was an Error</div>;

  return (
    <div>DashboardComponent</div>
  )
}

export default DashboardComponent