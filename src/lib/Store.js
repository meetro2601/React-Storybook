import {configureStore,createSlice} from '@reduxjs/toolkit'
import * as TaskStories from '../components/Task/Task.stories'

// The initial state of our store when the app loads.
const defaultTasks = [
    {...TaskStories.Default.args.task,id:'1',title:"Task 1"}, 
    {...TaskStories.Default.args.task,id:'2',title:"Task 2"}, 
    {...TaskStories.Default.args.task,id:'3',title:"Task 3"}, 
    {...TaskStories.Default.args.task,id:'4',title:"Task 4"}, 
    {...TaskStories.Default.args.task,id:'5',title:"Task 5"},
];

export const DefaultTaskBoxData = {
    tasks: defaultTasks,
    status: 'idle',
    error: null,
  };

// The store is created here
const TasksSlice = createSlice({
    name:'taskbox',
    initialState:DefaultTaskBoxData,
    reducers:{
        updateTaskState(state,action){
            const {id,newTaskState} = action.payload
            const taskIndex = state.tasks.findIndex(task => task.id === id)
            if(taskIndex >= 0){
                state.tasks[taskIndex].state = newTaskState
            }
        }
    }
})

// The actions contained in the slice are exported for usage in our components
export const { updateTaskState } = TasksSlice.actions;

// app's store configuration
const store = configureStore({
    reducer:TasksSlice.reducer
})

export default store