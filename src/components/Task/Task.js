import React from 'react'
import propTypes from 'prop-types'
import '../../index.css'

function Task(props) {
    const {task,onArchiveTask,onPinTask} = props
  return (
    <div className=' bg-white border-b-2 p-4 flex justify-between items-center'>
      <div className=''>
        <input onClick={()=>onArchiveTask(task.id)} type='checkbox' className='mr-2' defaultChecked={task.state === "TASK_ARCHIVED"} name='checked'></input>
        <input type='text' className='bg-transparent' value={task.title} readOnly={true}></input>
      </div>
        <div className=''>
          {
            task.state !== "TASK_ARCHIVED" && 
            <button aria-label={`pinBtn-${task.id}`} className='bg-slate-300 p-1' onClick={()=>onPinTask(task.id)}>
              {
                task.state === 'TASK_PINNED' ? 'Pinned' : 'Pin'
              }
            </button>
          }
        </div>
    </div>
  )
}

export default Task

Task.propTypes = {
  task:propTypes.shape({
    id:propTypes.string.isRequired,
    title:propTypes.string.isRequired,
    state:propTypes.string.isRequired
  }),
  onArchiveTask: propTypes.func,
  onPinTask: propTypes.func
}