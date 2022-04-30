import React from "react";
import Input from "./Input";
// import Layout from "../../Layout";

export default {
    title:'Form/Input Component',
    component: Input,
    // decorators: [story => <Layout>{story()}</Layout>]  //Decorator only for input stories
}

export const SmallInput = ()=><Input size={12}></Input>
export const MediumInput = ()=><Input size={25}></Input>
export const LargeInput = ()=><Input size={50}></Input>