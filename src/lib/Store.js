import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import * as TaskStories from "../components/Task/Task.stories";

export const defaultTasks = [
  {...TaskStories.Default.args.task,id:'1',title:"Task 1"}, 
  {...TaskStories.Default.args.task,id:'2',title:"Task 2"}, 
  {...TaskStories.Default.args.task,id:'3',title:"Task 3"}, 
  {...TaskStories.Default.args.task,id:'4',title:"Task 4"}, 
  {...TaskStories.Default.args.task,id:'5',title:"Task 5"},
];

// The initial state of our store when the app loads.
export const DefaultTaskBoxData = {
  tasks: [],
  status: "idle",
  error: null,
};

// Creates an asyncThunk to fetch tasks from a remote endpoint
export const fetchTasks = createAsyncThunk("fetchTodos", async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1"
  );
  const data = await res.json();
  const result = data.map((item) => ({
    id: `${item.id}`,
    title: item.title,
    state: item.completed ? "TASK_ARCHIVED" : "TASK_INBOX",
  }));
  return result
});

// The store is created here
const TasksSlice = createSlice({
  name: "taskbox",
  initialState: DefaultTaskBoxData,
  reducers: {
    updateTaskState(state, action) {
      const { id, newTaskState } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex >= 0) {
        state.tasks[taskIndex].state = newTaskState;
      }
    },
  },
  // Extends the reducer for the async actions
  extraReducers(builder){
      builder.addCase(fetchTasks.pending,(state)=>{
          state.status = 'loading'
          state.error = null
          state.tasks = []
      })
      .addCase(fetchTasks.fulfilled, (state,action)=>{
          state.status = 'succeeded'
          state.error = null
          state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected,(state)=>{
          state.status = 'failed'
          state.error ='Error occurred'
          state.tasks = []
      })
  }
});



// The actions contained in the slice are exported for usage in our components
export const { updateTaskState } = TasksSlice.actions;

// app's store configuration
const store = configureStore({
  reducer: TasksSlice.reducer,
});

export default store;
