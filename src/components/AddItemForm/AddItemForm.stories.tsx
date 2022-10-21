import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm Component',
    component: AddItemForm
}

const callback = action('hello! button was pressed')

export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={callback}/>
}