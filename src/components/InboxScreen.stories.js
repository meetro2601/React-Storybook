import React from "react";
import InboxScreen from "./InboxScreen";
import store from "../lib/Store";
import { Provider } from "react-redux";
import { rest } from "msw";
import { defaultTasks } from "../lib/Store";
// import {fireEvent,within,waitFor,waitForElementToBeRemoved} from '@storybook/testing-library'

export default {
  title: "InboxScreen",
  component: InboxScreen,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

const Template = () => <InboxScreen />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        "https://jsonplaceholder.typicode.com/todos?userId=1",
        (req, res, ctx) => {return res(ctx.json(defaultTasks))}
      ),
    ],
  },
};


/* Default.play = async ({canvasElement})=>{
  const canvas = within(canvasElement)
  // Waits for the component to transition from the loading state
  await waitForElementToBeRemoved(await canvas.findByTestId('loading'))
  // Waits for the component to be updated based on the store
  await waitFor(async ()=>{
    // Simulates pinning the second task
    await fireEvent.click(canvas.getByLabelText('pinBtn-2'))
  })
} */

export const Error = Template.bind({});
Error.parameters = {
  msw: {
    handlers: [
      rest.get(
        "https://jsonplaceholder.typicode.com/todos?userId=1",
        (req, res, ctx) => {return res(ctx.status(403))}
      ),
    ],
  },
};
