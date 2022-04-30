import React from "react";
import { Primary } from "./components/Button/Button.stories";
import { LargeInput } from "./components/Input/Input.stories";

export default {
  title: "Form/Subscription",
};

export const BasicSubscriptionForm = () => {
  return (
    <>
      <LargeInput />
      <Primary />
    </>
  );
};
