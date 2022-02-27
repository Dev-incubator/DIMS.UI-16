import { PureComponent } from 'react';
import { getAllTasks } from '../../scripts/api-service';
import { PageHeader } from '../helpers/PageHeader';
import { TableHeader } from '../helpers/TableHeader';
import styles from './Tasks.module.css';
import { TaskRow } from './taskRow/TaskRow';

const tableTitles = ['#', 'Task name', 'Description', 'Start date', 'Deadline', 'Action'];

export class Tasks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const tasks = await getAllTasks();
    this.setState((prevState) => ({ ...prevState, tasks }));
  };

  render() {
    const { tasks } = this.state;

    return (
      <div>
        <PageHeader text='Tasks' isBackButton={false} />
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
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
