import {action} from "@storybook/addon-actions";
import {Task} from "./Taks";

export default {
    title: 'Task component',
    component: Task
}

const ChangeTaskStatusCallback = action('Status changed')
const ChangeTaskTitleCallback = action('Title changed')
const RemoveTaskCallback = action('Task removed')

export const TaskBaseExample = () => {
    return <>
        <Task
            task={{id: '1', title: 'React', isDone: false}}
            changeTaskStatus={ChangeTaskStatusCallback}
            removeTask={RemoveTaskCallback}
            changeTaskTitle={ChangeTaskTitleCallback}
            todolistId={'todolistId1'}
        />
        <Task
            task={{id: '2', title: 'React', isDone: false}}
            changeTaskStatus={ChangeTaskStatusCallback}
            removeTask={RemoveTaskCallback}
            changeTaskTitle={ChangeTaskTitleCallback}
            todolistId={'todolistId2'}
        />
    </>
}