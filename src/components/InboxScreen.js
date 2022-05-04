import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { fetchTasks } from '../lib/Store'
import Tasklist from './Tasklist/Tasklist'

function InboxScreen() {
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)

    useEffect(() => {
      dispatch(fetchTasks())
    }, [])
    
    if(error){
        return (
            <div className='p-4'>
                <p className='text-4xl'>Oh No!</p>
                <p className='text-3xl'>Something Went Wrong</p>
            </div>
        )
    }

  return (
    <div>
        <h1 className='text-5xl font-bold'>Taskbox</h1>
        <Tasklist/>
    </div>
  )
}

export default InboxScreen