"use client"

import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie';
import PageLoader from '../page-loader/PageLoader'
import api from '@/app/utils/Axios-interceptors'
import { useRouter } from 'next/navigation'

const DashboardComponent = () => {

  const token = Cookies.get('token')
  const router = useRouter()

  const {data, isLoading, isError} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await api.get('/users/get-users/student',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(data);
      
      return data
    }
  })

  function logoutAdmin(){
    Cookies.remove('token')
    router.replace('/')
  }
  // nwaforglory6@gmail.com
  if (isLoading) return <PageLoader />;
  if (isError) return <div>Sorry There was an Error</div>


  return (
    <div>
      <p>DashboardComponent</p>
      <button onClick={logoutAdmin}>Logout</button>
    </div>
  )
}

export default DashboardComponent