import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Progress.module.css';
import { ProgressRow } from './progressRow/ProgressRow';
import { PageHeader } from '../helpers/PageHeader';
import { TableHeader } from '../helpers/TableHeader';
import { getUserById, getUserTasksById } from '../../scripts/api-service';
import { ThemeContext } from '../../providers/ThemeProvider';
import { Loading } from '../loading/Loading';

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
    if (!userName) {
      return <Loading />;
    }
    const pageTitle = `${userName}'s progress`;

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div>
            <PageHeader text={pageTitle} isBackButton />
            <div className={styles.content}>
              <table className={`${styles.progress} ${styles[theme]}`}>
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
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

Progress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }).isRequired,
};
