import { PureComponent } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import styles from './Members.module.css';
import { MemberInfoRow } from './memberInfoRow/MemberInfoRow';
import { db } from '../../scripts/firebase-config';
import { TableHeader } from '../helpers/TableHeader';
import { DeleteModal } from '../modals/deleteModal/DeleteModal';
import { deleteUser } from '../../scripts/api-service';
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
    this.userCollectionRef = collection(db, 'users');
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    const users = await this.getData();
    this.setState({ users });
  }

  async componentDidUpdate() {
    const users = await this.getData();
    if (this.isComponentMounted) {
      this.setState({ users });
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  getData = async () => {
    const data = await getDocs(this.userCollectionRef);

    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
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
