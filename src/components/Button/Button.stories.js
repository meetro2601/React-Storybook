import { action, actions } from '@storybook/addon-actions'
import React from 'react'
import Button from './Button'

export default {
    title:"Form/Button",
    component: Button
}

export const Primary = ()=> <Button onClick={action('Clicked')} variant='primary'>Primary</Button>
export const Secondary = ()=> <Button {...actions('onClick','onMouseOver')} variant='secondary'>Secondary</Button>
export const Success = ()=> <Button variant='success'>Success</Button>

Primary.storyName = 'PrimaryBtn'

// Using Args
const Template = args => <Button onClick={()=>console.log('Args Button clicked',process.env.MY_NAME)} {...args}></Button>

export const ArgsPrimary = Template.bind({})
ArgsPrimary.args = {
    variant:'primary',
    children:"Args Primary",
}

export const Danger = Template.bind({})
Danger.args = {
    variant:'danger',
    children:"Danger"
}

export const ArgsDanger = Template.bind({})
ArgsDanger.args = {
    ...Danger.args,
    children:"Args Danger"
}

