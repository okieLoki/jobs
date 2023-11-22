import AppliedJobDataTable from '@/components/AppliedJobDataTable'
import NavBar from '@/components/NavBar'
import SavedJobDataTable from '@/components/SavedJobDataTable'
import { get_my_applied_job } from '@/Services/job'
import { get_book_mark_job } from '@/Services/job/bookmark'
import { setAppliedJob, setBookMark } from '@/Utils/AppliedJobSlice'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'




export default function Dashboard() {
  const [showTable, setShowTable] = useState('appliedJobs')
  const [loading , setLoading] = useState(true)
  const router = useRouter();
  const dispatch = useDispatch();

  const activeUser = useSelector(state => state?.User?.userData)
  const id = activeUser?._id

  useEffect(() => {
    if (!id || !Cookies.get('token')) {
      router.push('/auth/login')
    }
  }, [activeUser, id, Cookies])

  


  useEffect(() => {
    fetchAppliedJobs()
  }, [])


  const fetchAppliedJobs = async () => {

    const res = await get_my_applied_job(id)
    const get_bookmarks =   await get_book_mark_job(id)
    if (res.success || get_bookmarks.success) {
      dispatch(setAppliedJob(res?.data))
      dispatch(setBookMark(get_bookmarks?.data))
      setLoading(false)
    }
    else {
      router.push('/auth/login')
    }
  }


  return (
    <>

      {
        loading ? (

          <div className='bg-gray w-full h-screen flex items-center flex-col justify-center'>
            <InfinitySpin width='200' color="#4f46e5" />
            <p className='text-xs uppercase'>Loading Resources Hold Tight...</p>
          </div>
        ) : (
          <>
            <NavBar />
            <div className='w-full h-screen pt-20 flex items-center justify-start flex-col'>
              <div className='flex bg-gray-100 flex-wrap items-center justify-center w-full py-2 px-2'>
                {/* applied Jobs */}
       

                {/* applied Jobs */}
              </div>
              <div className='w-full h-full px-4 '>
                {
                  showTable === 'savedJobs' ? <SavedJobDataTable /> : <AppliedJobDataTable />
                }
              </div>
            </div>
          </>
        )
      }

    </>
  )
}
