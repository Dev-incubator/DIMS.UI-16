import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Progress.module.css';
import { ProgressRow } from './progressRow/ProgressRow';
import { PageHeader } from '../helpers/PageHeader';
import { TableHeader } from '../helpers/TableHeader';
import { getUserById, getUserTasksById } from '../../scripts/api-service';

const tableTitles = ['#', 'Task name', 'Task note', 'Date'];

export class Progress extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: [],
      userName: null,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const userId = match.params.id;
    const progress = await getUserTasksById(userId);
    const user = await getUserById(userId);
    this.setState((prevState) => ({ ...prevState, progress, userName: user.name }));
  }

  render() {
    const { progress, userName } = this.state;
    if (!progress || !userName) {
      return <div className={styles.loading}>Loading...</div>;
    }
    const pageTitle = `${userName}'s progress`;

    return (
      <div>
        <PageHeader text={pageTitle} isBackButton />
        <table className={styles.progress}>
          <TableHeader titles={tableTitles} />
          <tbody>
            {progress.map((task, index) => (
              <ProgressRow
                key={task.id}
                title={task.title}
                date={task.startDate}
                description={task.description}
                number={index + 1}
                taskId={task.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Progress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }).isRequired,
};
