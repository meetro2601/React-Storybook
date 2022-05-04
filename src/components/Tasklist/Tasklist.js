import React from "react";
import propTypes from 'prop-types'
import Task from "../Task/Task";
import {useDispatch,useSelector} from 'react-redux'
import { updateTaskState } from '../../lib/Store';

function Tasklist(props) {
  // const { loading, tasks, onArchive, onPin } = props;
  const tasks = useSelector((state) => {
    const tasksInOrder = [
      ...state.tasks.filter((t) => t.state === 'TASK_PINNED'),
      ...state.tasks.filter((t) => t.state !== 'TASK_PINNED'),
    ];
    const filteredTasks = tasksInOrder.filter(
      (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    );
    return filteredTasks;
  });

  const status = useSelector(state => state.status)
  const storeState = useSelector(state => state)

  const dispatch = useDispatch()

  const onPin = (id)=>{
    const task =storeState.tasks.find((task) => task.id === id);
      if (task.state === "TASK_PINNED") {
        dispatch(updateTaskState({id, newTaskState:"TASK_INBOX"})) 
      }else{
        dispatch(updateTaskState({id, newTaskState:"TASK_PINNED"}))
      }
  }

  const onArchive = (id)=>{
    dispatch(updateTaskState({id,newTaskState:"TASK_ARCHIVED"}))
  }

  if (status === 'loading') {
    return <div className="bg-white" data-testid='loading'>Loading...</div>;
  }

  if (tasks.length === 0) {
    return <div className="bg-white">No Tasks Found</ div>;
  }

  const tasksInOrder = [
      ...tasks.filter(task => task.state === 'TASK_PINNED'),
      ...tasks.filter(task => task.state !== 'TASK_PINNED')
  ]

  return (
    <div>
      {tasksInOrder.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            onArchiveTask={task => onArchive(task)}
            onPinTask={task => onPin(task)}
          ></Task>
        );
      })}
    </div>
  );
}

export default Tasklist;

Tasklist.propTypes = {
  loading:propTypes.bool,
  tasks: propTypes.arrayOf(Task.propTypes.task),
  onArchive: propTypes.func,
  onPin: propTypes.func
}

Tasklist.defaultProps = {
  loading:false
}