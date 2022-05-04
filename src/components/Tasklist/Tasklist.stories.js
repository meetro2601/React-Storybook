import React from "react";
import Tasklist from "./Tasklist";
import * as TaskStories from '../Task/Task.stories'
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from "react-redux";
import { defaultTasks } from "../../lib/Store";

const MockedTaskBoxData = {
    tasks: defaultTasks,
    status:'idle',
    error:null
}

const MockStoreProvider = (props)=>{
    const {taskboxState,children} = props
    
    const mockTaskbox = createSlice({
        name:'mockTaskbox',
        initialState: taskboxState,
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
    
    const Mockstore = configureStore({
        reducer:mockTaskbox.reducer
    })

    return (
        <Provider store={Mockstore}>
            {children}
        </Provider>
    )

}

export default {
    title:"Tasklist",
    component: Tasklist,
    decorators: [Story => <div className="p-10"><Story/></div>]
}

// const Template = args => <Tasklist {...args}></Tasklist>
const Template = () => <Tasklist></Tasklist>

export const DefaultList = Template.bind({})
DefaultList.decorators = [story =><MockStoreProvider taskboxState={MockedTaskBoxData}>{story()}</MockStoreProvider>]
/* DefaultList.args = {
    tasks : [
        {...TaskStories.Default.args.task,id:'1',title:"Task 1"}, 
        {...TaskStories.Default.args.task,id:'2',title:"Task 2"}, 
        {...TaskStories.Default.args.task,id:'3',title:"Task 3"}, 
        {...TaskStories.Default.args.task,id:'4',title:"Task 4"}, 
        {...TaskStories.Default.args.task,id:'5',title:"Task 5"}, 
    ]
} */

export const WithPinnedList = Template.bind({})
WithPinnedList.decorators = [
    story => {
        const pinnedTasks = [
            ...MockedTaskBoxData.tasks.slice(0,3),
            {...TaskStories.Pinned.args.task,id:'4',title:'Task 4 (Pinned)'},
        {...TaskStories.Pinned.args.task,id:'5',title:'Task 5 (Pinned)'}
        ]

        return (
            <MockStoreProvider taskboxState={{...MockedTaskBoxData,tasks:pinnedTasks}}>{story()}</MockStoreProvider>
        )
    }
]
/* WithPinnedList.args = {
    tasks : [
        ...DefaultList.args.tasks.slice(0,3),
        {...TaskStories.Pinned.args.task,id:'4',title:'Task 4 (Pinned)'},
        {...TaskStories.Pinned.args.task,id:'5',title:'Task 5 (Pinned)'}
    ]
} */

export const Loading = Template.bind({})
Loading.decorators = [story =><MockStoreProvider taskboxState={{...MockedTaskBoxData,status:'loading'}}>{story()}</MockStoreProvider>]
/* Loading.args = {
    tasks:[],
    loading:true
} */

export const NoTasks = Template.bind({})
NoTasks.decorators = [story => <MockStoreProvider taskboxState={{...MockedTaskBoxData,tasks:[]}}>{story()}</MockStoreProvider>]
/* NoTasks.args = {
    ...Loading.args,
    loading: false
} */