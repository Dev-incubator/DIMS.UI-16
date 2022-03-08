import { PureComponent } from 'react';
import styles from './Members.module.css';
import { MemberInfoRow } from './memberInfoRow/MemberInfoRow';
import { TableHeader } from '../helpers/TableHeader';
import { DeleteModal } from '../modals/deleteModal/DeleteModal';
import { deleteUser, getAllUsers } from '../../scripts/api-service';
import { PageHeader } from '../helpers/PageHeader';

const memberTableTitles = ['#', 'Full name', 'Direction', 'Education', 'Start', 'Age', 'Action'];

export class Members extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      deleteMode: false,
      actionUserId: null,
    };
    this.isComponentMounted = false;
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    await this.getData();
  }

  async componentDidUpdate() {
    await this.getData();
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  getData = async () => {
    const users = await getAllUsers();
    if (this.isComponentMounted) {
      this.setState((prevState) => ({ ...prevState, users }));
    }
  };

  enableDeleteMode = (id) => {
    this.setState({ deleteMode: true, actionUserId: id });
  };

  removeUser = async () => {
    const { actionUserId } = this.state;
    await deleteUser(actionUserId);
    this.disableDeleteMode();
  };

  disableDeleteMode = () => {
    this.setState({ deleteMode: false });
  };

  render() {
    const { users, deleteMode } = this.state;

    return (
      <div>
        <PageHeader text='Members' isBackButton={false} />
        <table className={styles.members}>
          <TableHeader titles={memberTableTitles} />
          <tbody>
            {users.map((user, index) => (
              <MemberInfoRow
                key={user.id}
                id={user.id}
                direction={user.direction}
                name={user.name}
                number={index + 1}
                age={user.age}
                education={user.education}
                startDate={user.startDate}
                enableDeleteMode={this.enableDeleteMode}
              />
            ))}
          </tbody>
        </table>
        {deleteMode && <DeleteModal removeHandler={this.removeUser} cancelHandler={this.disableDeleteMode} />}
      </div>
    );
  }
}

Members.propTypes = {};
Members.defaultProps = {};
