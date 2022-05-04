import React from "react";
import Task from "./Task";

export default {
    title:'Task',
    component: Task
}

const Template = args => <Task {...args}></Task>

export const Default = Template.bind({})
Default.args = {
    task:{
        id:'1',
        title:'Test Task',
        state:'TASK_INBOX',
        updatedAt: new Date()
    }
}

export const Pinned = Template.bind({})
Pinned.args = {
    task: {
        ...Default.args.task,
        state:"TASK_PINNED"
    }
}

export const Archived = Template.bind({})
Archived.args = {
    task:{
        ...Default.args.task,
        state:"TASK_ARCHIVED"
    }
}