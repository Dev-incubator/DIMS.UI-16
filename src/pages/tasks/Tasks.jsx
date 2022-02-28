import { PureComponent } from 'react';
import { getAllTasks, getAllUsers } from '../../scripts/api-service';
import { PageHeader } from '../helpers/PageHeader';
import { TableHeader } from '../helpers/TableHeader';
import styles from './Tasks.module.css';
import { TaskRow } from './taskRow/TaskRow';
import { TaskModal } from '../modals/createModals/taskModal/TaskModal';

const tableTitles = ['#', 'Task name', 'Description', 'Start date', 'Deadline', 'Action'];

export class Tasks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      modalMode: false,
      users: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const tasks = await getAllTasks();
    const users = await getAllUsers();
    this.setState((prevState) => ({ ...prevState, tasks, users }));
  };

  changeModalMode = () => {
    this.setState((prevState) => ({ modalMode: !prevState.modalMode }));
  };

  render() {
    const { tasks, modalMode, users } = this.state;

    return (
      <div>
        <PageHeader text='Tasks' isBackButton={false} onClick={this.changeModalMode} />
        <table className={styles.tasks}>
          <TableHeader titles={tableTitles} />
          <tbody>
            {tasks.map((task, index) => (
              <TaskRow
                key={task.id}
                title={task.title}
                description={task.description}
                deadline={task.deadline}
                startDate={task.startDate}
                number={index + 1}
                changeEditMode={this.changeEditMode}
              />
            ))}
          </tbody>
        </table>
        {modalMode && <TaskModal users={users} mode='create' />}
      </div>
    );
  }
}
