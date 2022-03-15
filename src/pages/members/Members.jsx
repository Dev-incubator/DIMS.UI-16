import { PureComponent } from 'react';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, deleteUser } from 'firebase/auth';
import styles from './Members.module.css';
import { MemberInfoRow } from './memberInfoRow/MemberInfoRow';
import { TableHeader } from '../helpers/TableHeader';
import { DeleteModal } from '../modals/deleteModal/DeleteModal';
import { createUser, removeUser, getAllUsers, login, getUserById, updateUser } from '../../scripts/api-service';
import { PageHeader } from '../helpers/PageHeader';
import { deepEqual, getAge } from '../../scripts/helpers';
import { DELETE_VALUES, MODAL_MODES, PAGE_TITLES } from '../../scripts/libraries';
import { UserModal } from '../modals/userModal/UserModal';
import { auth } from '../../scripts/firebase-config';
import { cryptId } from '../../scripts/crypt';

const memberTableTitles = ['#', 'Full name', 'Direction', 'Education', 'Start', 'Age', 'Action'];

export class Members extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      modalMode: null,
      actionUserId: null,
    };
    this.isComponentMounted = false;
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    await this.getData();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!deepEqual(prevState, this.state)) {
      await this.getData();
    }
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

  setModalMode = (modalMode, actionUserId = null) => {
    this.setState({ modalMode, actionUserId });
  };

  disableModalMode = () => {
    this.setState({ modalMode: null, actionUserId: null });
  };

  createUser = async (user) => {
    try {
      const { email, password } = await getUserById(auth.currentUser.uid);
      const newUser = await createUserWithEmailAndPassword(auth, user.email, user.password);
      await login(user.email, user.password);
      await sendPasswordResetEmail(auth, user.email, {
        url: `http://localhost/?uid=${cryptId(newUser.user.uid)}`,
      });
      await signOut(auth);
      await login(email, password);
      await createUser(newUser.user.uid, user);
    } catch (error) {
      console.log(error.message);
    }
    this.disableModalMode();
  };

  updateUser = async (user) => {
    console.log(user);
    const { actionUserId } = this.state;
    await updateUser(actionUserId, user);
    this.disableModalMode();
  };

  removeUser = async () => {
    const { actionUserId, users } = this.state;
    const { email, password } = users.find((item) => item.id === actionUserId);
    try {
      const currentUser = await getUserById(auth.currentUser.uid);
      await login(email, password);
      await deleteUser(auth.currentUser);
      await signOut(auth);
      await login(currentUser.email, currentUser.password);
      await removeUser(actionUserId);
    } catch (error) {
      console.log(error);
    }
    this.disableModalMode();
  };

  render() {
    const { users, modalMode, actionUserId } = this.state;
    const actionUser = users.find((item) => item.id === actionUserId);

    return (
      <div>
        <PageHeader text={PAGE_TITLES.members} onClick={() => this.setModalMode(MODAL_MODES.create)} />
        <table className={styles.members}>
          <TableHeader titles={memberTableTitles} />
          <tbody>
            {users.map((user, index) => {
              const setDeleteMode = () => {
                this.setModalMode(MODAL_MODES.delete, user.id);
              };
              const setEditMode = () => {
                this.setModalMode(MODAL_MODES.edit, user.id);
              };
              const setReadMode = () => {
                this.setModalMode(MODAL_MODES.read, user.id);
              };

              return (
                <MemberInfoRow
                  key={user.id}
                  id={user.id}
                  direction={user.direction}
                  name={user.name}
                  surname={user.surname}
                  number={index + 1}
                  age={getAge(user.birthDate)}
                  education={user.education}
                  startDate={user.startDate}
                  setEditMode={setEditMode}
                  setReadMode={setReadMode}
                  setDeleteMode={setDeleteMode}
                />
              );
            })}
          </tbody>
        </table>
        <DeleteModal
          target={DELETE_VALUES.member}
          active={modalMode === MODAL_MODES.delete}
          removeHandler={this.removeUser}
          cancelHandler={this.disableModalMode}
        />
        <UserModal
          updateUser={this.updateUser}
          createUser={this.createUser}
          user={actionUser}
          disableModalMode={this.disableModalMode}
          readOnly={modalMode === MODAL_MODES.read}
          active={!!modalMode && modalMode !== MODAL_MODES.delete}
        />
      </div>
    );
  }
}

Members.propTypes = {};
Members.defaultProps = {};
